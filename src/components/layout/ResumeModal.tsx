import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Check, X } from 'lucide-react'
import { profile } from '../../data/portfolio'

interface ResumeModalProps {
  open: boolean
  onClose: () => void
}

const reasons = ['Hiring', 'Freelance project', 'Collaboration', 'Networking', 'Just curious']

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  company: '',
  role: '',
  reason: reasons[0],
  consent: false,
}

type Status = 'idle' | 'sending' | 'done'

function downloadResume() {
  const link = document.createElement('a')
  link.href = profile.resume
  link.download = profile.resume.split('/').pop() || 'resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/** Send one row to the Google Apps Script web app (see google-apps-script/resume-log.gs). */
async function logRequest(form: typeof emptyForm) {
  if (!profile.resumeLogUrl) {
    console.warn('profile.resumeLogUrl is not set — resume request was not logged.')
    return
  }
  const body = new URLSearchParams({
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    company: form.company.trim(),
    role: form.role.trim(),
    reason: form.reason,
    consent: form.consent ? 'yes' : 'no',
    page: window.location.href,
  })
  // Apps Script does not send CORS headers, so the response can't be read; 'no-cors' still delivers the POST.
  await fetch(profile.resumeLogUrl, { method: 'POST', mode: 'no-cors', body })
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<Status>('idle')

  // Reset when reopened, and close on Escape.
  useEffect(() => {
    if (!open) return
    setStatus('idle')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const update = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await logRequest(form)
    } catch (err) {
      // Don't block the visitor if logging fails; just note it.
      console.error('Could not log resume request', err)
    }
    downloadResume()
    setStatus('done')
    setForm(emptyForm)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="resume-modal pixel-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            <div className="eyebrow"><span className="eyebrow-dot" /> ( REQUEST A COPY )</div>
            <h3 id="resume-modal-title">Before you download</h3>
            <p className="resume-modal-sub">Resume · {profile.name}</p>

            {status === 'done' ? (
              <div className="resume-done">
                <div className="resume-done-icon"><Check size={22} /></div>
                <p>Thanks! Your download should start automatically.</p>
                <a className="button button-ghost" href={profile.resume} download>
                  Download again <ArrowDown size={15} />
                </a>
              </div>
            ) : (
              <form className="resume-form" onSubmit={submit}>
                <label>
                  <span>Full name *</span>
                  <input
                    required
                    autoFocus
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </label>
                <label>
                  <span>Email *</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </label>
                <label>
                  <span>Company</span>
                  <input
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                  />
                </label>
                <label>
                  <span>Your role</span>
                  <input
                    autoComplete="organization-title"
                    placeholder="e.g. HR manager"
                    value={form.role}
                    onChange={(e) => update('role', e.target.value)}
                  />
                </label>
                <label>
                  <span>Reason</span>
                  <select value={form.reason} onChange={(e) => update('reason', e.target.value)}>
                    {reasons.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </label>

                <label className="resume-consent">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                  />
                  <span>I agree to share these details with {profile.name} so they know who downloaded the resume.</span>
                </label>

                <button className="button button-primary resume-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : <>Continue to download <ArrowDown size={15} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
