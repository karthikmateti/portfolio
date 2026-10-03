import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react'
import { socialLinks } from '../data/socialLinks'

const nav = [['about', 'About'], ['experience', 'Experience'], ['research', 'Research'], ['projects', 'Projects'], ['skills', 'Skills'], ['achievements', 'Achievements'], ['certifications', 'Certifications'], ['education', 'Education'], ['contact', 'Contact']]
export function Navbar({ onCommand }: { onCommand: () => void }) {
  const [active, setActive] = useState('about')
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    nav.forEach(([id]) => {
      const target = document.getElementById(id)
      if (!target) return
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(id) }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(target); observers.push(observer)
    })
    return () => observers.forEach(observer => observer.disconnect())
  }, [])
  useEffect(() => {
    if (!menu) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menu])
  const close = () => setMenu(false)
  return <>
    <div className="topline"><span>KARTHIK MATETI / PORTFOLIO</span><span className="topline-right"><i /> AI / ML · RESEARCH <span className="topline-date">CHENNAI, INDIA</span><button onClick={onCommand} className="shortcut" aria-label="Open command palette">CTRL / ⌘ K</button></span></div>
    <header className="navbar"><a className="brand" href="#top" onClick={close}><span className="brand-mark">K<span>.</span></span><span>KARTHIK MATETI<small>COMPUTING & DATA SCIENCE</small></span></a>
      <nav className={`nav-links${menu ? ' nav-open' : ''}`} aria-label="Main navigation">
        {nav.map(([id, label], index) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={close}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>)}
        <div className="mobile-nav-bottom"><a href="/documents/Mateti_Karthik_Resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a><div><a aria-label="GitHub" href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={17} /></a><a aria-label="LinkedIn" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /></a></div></div>
      </nav>
      <div className="nav-actions"><a className="nav-resume" href="/documents/Mateti_Karthik_Resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={13} /></a><a aria-label="GitHub" href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={17} /></a><a aria-label="LinkedIn" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /></a></div>
      <button className="menu-toggle" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(value => !value)}>{menu ? <X /> : <Menu />}</button>
    </header>
  </>
}
