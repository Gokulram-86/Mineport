import { navItems } from '../../constants/navigation'

interface BottomHotbarProps {
  activeSection: string
  navigate: (id: string) => void
}

const hotbarIcons = ['⌂', '☺', '▦', '⚒']

export default function BottomHotbar({ activeSection, navigate }: BottomHotbarProps) {
  return (
    <div className="bottom-hotbar">
      <div className="hotbar-label">QUICK SLOTS</div>
      {navItems.slice(0, 4).map((item, index) => (
        <button
          key={item.id}
          className={activeSection === item.id ? 'quick-slot active' : 'quick-slot'}
          onClick={() => navigate(item.id)}
          title={item.label}
        >
          <span>{hotbarIcons[index]}</span>
          <small>{index + 1}</small>
        </button>
      ))}
      <button
        className={activeSection === 'contact' ? 'quick-slot active' : 'quick-slot'}
        onClick={() => navigate('contact')} title="Contact">
        <span>✉</span>
        <small>5</small>
      </button>
    </div>
  )
}
