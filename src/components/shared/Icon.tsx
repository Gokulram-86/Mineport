/** Renders an emoji, or an image when the value is a path like '/images/x.png'. */
export default function Icon({ value }: { value: string }) {
  return value.startsWith('/') ? <img className="icon-img" src={value} alt="" /> : <>{value}</>
}
