interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle: string
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

