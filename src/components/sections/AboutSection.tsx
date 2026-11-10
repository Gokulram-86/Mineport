import { ArrowUpRight, BookOpen, BriefcaseBusiness } from 'lucide-react'
import { profile } from '../../data/portfolio'

import SectionHeading from '../shared/SectionHeading'

const profileImg = '/images/profile.png'
interface AboutSectionProps {
  navigate: (id: string) => void
}

export default function AboutSection({ navigate }: AboutSectionProps) {
  return (
    <section className="about-section section-pad" id="about">
      <div className="page-width about-grid">
        <div className="about-visual">
          <div className="profile-card pixel-panel">
            <div className="panel-top">
              <span>PLAYER PROFILE</span>
              <span className="panel-dots">•••</span>
            </div>
            <div className="h-fit w-auto"><img src={profileImg} alt={profile.name} className="profile-avatar-img" /></div>
            <div className="profile-name">{profile.name}</div>
            <div className="profile-title">{profile.role}</div>
            <div className="profile-stats">
              <div><span>CLASS</span><b>Software Developer</b></div>
              <div><span>BIOME</span><b>INDIA</b></div>
              <div><span>STATUS</span><b className="online-text">ONLINE</b></div>
            </div>
            <div className="profile-quote">"In a world of infinite variables, I choose to be the constant."</div>
          </div>
          <div className="floating-block block-grass"><span /></div>
          <div className="floating-block block-diamond">◆</div>
        </div>

        <div className="about-copy">
          <SectionHeading
            eyebrow="01 / PLAYER PROFILE"
            title="The player behind the keyboard."
            subtitle="A little about my spawn point."
          />
          <p className="body-copy">{profile.about}</p>
          <p className="body-copy muted-copy">
            I believe good engineering is a mix of curiosity, fundamentals, thoughtful
            problem-solving and the patience to keep iterating until things work well.
          </p>
          <div className="about-facts">
            <div>
              <span className="fact-icon"><BookOpen size={17} /></span>
              <div><small>EDUCATION</small><strong>Software Engineering</strong></div>
            </div>
            <div>
              <span className="fact-icon"><BriefcaseBusiness size={17} /></span>
              <div><small>PROFESSIONAL QUEST</small><strong>Tech Services Analyst T2</strong></div>
            </div>
          </div>
          <button className="text-link" onClick={() => navigate('experience')}>
            View my journey <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

