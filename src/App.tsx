import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, Check, Command, Database, ExternalLink, FileText, Github, GraduationCap, Linkedin, Mail, Phone, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Certifications } from './components/Certifications'
import { SectionHeader } from './components/ui/SectionHeader'
import { Badge } from './components/ui/Badge'
import { Modal } from './components/ui/Modal'
import { DownloadButton } from './components/ui/DownloadButton'
import { SocialIconLink } from './components/ui/SocialIconLink'
import { profile } from './data/profile'
import { socialLinks } from './data/socialLinks'
import { experience } from './data/experience'
import { projects, type Project } from './data/projects'
import { skillGroups } from './data/skills'
import { achievements } from './data/achievements'
import { semesters } from './data/education'
import { documents } from './data/documents'
import { useCommandPalette } from './hooks/useCommandPalette'
import { useScrollProgress } from './hooks/useScrollProgress'
import './styles.css'

const commands = [
  ...[['Go to About', 'about'], ['Go to Experience', 'experience'], ['Go to Research', 'research'], ['Go to Projects', 'projects'], ['Go to Skills', 'skills'], ['Go to Achievements', 'achievements'], ['Go to Certifications', 'certifications'], ['Go to Education', 'education'], ['Go to Contact', 'contact']].map(([label, id]) => ({ label, icon: ArrowDownRight, run: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) })),
  { label: 'Download Resume', icon: FileText, run: () => downloadDocument('/documents/Mateti_Karthik_Resume.pdf', 'Mateti_Karthik_Resume.pdf') },
  { label: 'Download Transcript', icon: GraduationCap, run: () => downloadDocument('/documents/Mateti_Karthik_Transcript.pdf', 'Mateti_Karthik_Transcript.pdf') },
  { label: 'Open GitHub', icon: Github, run: () => window.open(socialLinks.github, '_blank', 'noopener,noreferrer') },
  { label: 'Open LinkedIn', icon: Linkedin, run: () => window.open(socialLinks.linkedin, '_blank', 'noopener,noreferrer') },
  { label: 'Send Email', icon: Mail, run: () => window.location.assign(socialLinks.email) },
  { label: 'Call Karthik', icon: Phone, run: () => window.location.assign(socialLinks.phone) },
]
async function downloadDocument(url: string, filename: string) {
  const response = await fetch(url)
  if (!response.ok) { window.open(url, '_blank', 'noopener,noreferrer'); return }
  const blob = await response.blob(); const objectUrl = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = objectUrl; a.download = filename; a.click(); URL.revokeObjectURL(objectUrl)
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const results = useMemo(() => commands.filter(command => command.label.toLowerCase().includes(query.toLowerCase())), [query])
  useEffect(() => { setActive(0) }, [query, open])
  useEffect(() => {
    if (!open) return
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') { event.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)) }
      if (event.key === 'ArrowUp') { event.preventDefault(); setActive(i => Math.max(0, i - 1)) }
      if (event.key === 'Enter' && results[active]) { results[active].run(); onClose() }
    }
    document.addEventListener('keydown', listener); return () => document.removeEventListener('keydown', listener)
  }, [open, active, results, onClose])
  return <AnimatePresence>{open && <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.currentTarget === event.target) onClose() }}><motion.div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}>
    <div className="palette-input"><Search size={18} /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="What would you like to do?" aria-label="Search commands" /><button onClick={onClose} aria-label="Close command palette"><kbd>ESC</kbd></button></div>
    <div className="palette-list" role="listbox">{results.map((command, index) => <button key={command.label} role="option" aria-selected={active === index} className={active === index ? 'command-active' : ''} onMouseEnter={() => setActive(index)} onClick={() => { command.run(); onClose() }}><command.icon size={16} /><span>{command.label}</span><ArrowUpRight size={13} /></button>)}{!results.length && <div className="empty-state">No commands found.</div>}</div>
    <div className="palette-foot"><span><Command size={12} /> K to open</span><span>↑↓ NAVIGATE <b>↵</b> SELECT</span></div>
  </motion.div></motion.div>}</AnimatePresence>
}

function About() {
  return <section className="section wrap" id="about"><SectionHeader number="01" label="ABOUT" title="About me." note="Computing & Data Science student at Sai University." />
    <div className="about-grid"><div className="about-copy"><span className="eyebrow">COMPUTING & DATA SCIENCE · SAI UNIVERSITY</span><p>I study Computing & Data Science at Sai University. I’m interested in AI and machine learning, especially language models, multi-agent systems, explainable AI and privacy-preserving ML. My internships and projects have included resume screening, meeting summarization and federated learning.</p><p className="about-muted">I’m looking for opportunities to contribute to AI/ML research and software projects.</p><a href="#experience" className="text-link">View my experience <ArrowRight size={15} /></a></div>
      <div className="metric-grid"><div><span>CGPA</span><b>8.89</b><small>OUT OF 10</small></div><div><span>DEGREE</span><b>2024<span>—</span>28</b><small>B.TECH · COMPUTING & DATA SCIENCE</small></div><div><span>EXPERIENCE</span><b>3+</b><small>INTERNSHIP EXPERIENCES</small></div><div><span>MAIN INTEREST</span><b className="metric-focus">AI / ML</b><small>RESEARCH & SOFTWARE</small></div></div></div>
  </section>
}

function Experience() {
  const reduced = useReducedMotion()
  return <section className="section wrap" id="experience"><SectionHeader number="02" label="EXPERIENCE" title="Internships and research." note="Three internships in privacy-preserving ML, multi-agent systems and speech tools." />
    <div className="timeline">{experience.map((item, index) => <motion.article className="experience-entry" key={item.id} initial={reduced ? false : { opacity: 0, x: index % 2 ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: reduced ? 0 : .55, delay: reduced ? 0 : index * .08 }}><div className="timeline-index"><span>0{index + 1}</span><i /></div><div className="experience-content"><div className="experience-top"><span className="eyebrow">{item.short} <span className="slash">/</span> {item.date}</span><span className="experience-role">{item.role}</span></div><div className="experience-body"><div><h3>{item.org}</h3><p className="mentor">{item.mentor}</p></div><div className="experience-detail"><p>{item.summary}</p><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="tag-row">{item.tags.map(tag => <Badge key={tag} muted>{tag}</Badge>)}</div></div></div></div></motion.article>)}</div>
  </section>
}

function Research() {
  const reduced = useReducedMotion()
  const groups = [
    { number: 'A', title: 'ARTIFICIAL INTELLIGENCE', icon: Sparkles, nodes: ['Generative AI', 'Agentic AI', 'Multi-Agent Systems', 'Large Language Models', 'Retrieval-Augmented Generation', 'Explainable AI', 'Research Automation'] },
    { number: 'M', title: 'MACHINE LEARNING', icon: Database, nodes: ['Privacy-Preserving ML', 'Federated Learning', 'Data Anonymization', 'XGBoost', 'ML Security'] },
  ]
  return <section className="section wrap" id="research"><SectionHeader number="03" label="RESEARCH INTERESTS" title="Areas I’m exploring." note="Topics I’ve studied through coursework, internships and project work." />
    <div className="research-map">{groups.map(group => <div className="research-branch" key={group.number}><div className="branch-head"><span className="branch-icon"><group.icon size={16} /></span><span className="branch-code">{group.number} /</span><b>{group.title}</b><span className="branch-count">{String(group.nodes.length).padStart(2, '0')} TOPICS</span></div><div className="branch-track"><span className="branch-line" />{group.nodes.map((node, index) => <motion.div className="research-node" key={node} initial={reduced ? false : { opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }} transition={{ delay: reduced ? 0 : index * .035 }}><i />{node}<span>{String(index + 1).padStart(2, '0')}</span></motion.div>)}</div></div>)}<div className="map-footer"><span>CURRENT AREAS OF INTEREST</span><span>UPDATED 2026</span></div></div>
  </section>
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const reduced = useReducedMotion()
  return <section className="section wrap" id="projects"><SectionHeader number="04" label="PROJECTS" title="Selected projects." note="Work from my research internships and AI/ML projects." />
    <div className="project-list">{projects.map((project, index) => <motion.button key={project.id} data-cursor="VIEW" className="project-card" onClick={() => setSelected(project)} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .07 }}>
      <div className="project-card-index"><span>{project.number}</span><div className={`project-symbol symbol-${index + 1}`}>{index === 0 ? <ShieldCheck /> : index === 1 ? <Sparkles /> : <AudioLines />}</div></div><div className="project-card-main"><span className="eyebrow">{project.eyebrow}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.slice(0, 5).map(tag => <Badge key={tag} muted>{tag}</Badge>)}{project.tags.length > 5 && <span className="more-tags">+{project.tags.length - 5}</span>}</div></div><span className="project-open" aria-label={`Open ${project.title} case study`}><ArrowUpRight size={19} /></span>
    </motion.button>)}</div>
    <div className="project-foot"><span>SELECTED PROJECTS</span><span>03 / 03</span><span className="line" /><span>CASE STUDIES OPEN ON SELECT</span></div>
    {selected && <Modal title={selected.title} eyebrow={`${selected.eyebrow} / CASE STUDY`} onClose={() => setSelected(null)}><div className="case-study"><div className="case-description">{selected.description}</div><div className="case-block"><span>01 / PROBLEM</span><p>{selected.problem}</p></div><div className="case-block"><span>02 / APPROACH</span><ul>{selected.approach.map(step => <li key={step}>{step}</li>)}</ul></div><div className="case-block"><span>03 / SYSTEM FLOW</span><div className="architecture">{selected.architecture.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}{i < selected.architecture.length - 1 && <ArrowDown size={13} />}</div>)}</div></div>{selected.result && <div className="case-result"><Check size={16} />{selected.result}</div>}<div className="tag-row case-tags">{selected.tags.map(tag => <Badge key={tag} muted>{tag}</Badge>)}</div><div className="modal-actions case-links">{selected.repo && <a className="button button-secondary" href={selected.repo} target="_blank" rel="noopener noreferrer"><Github size={15} /> Source code <ExternalLink size={13} /></a>}{selected.certificate && <a className="button button-secondary" href={selected.certificate} target="_blank" rel="noopener noreferrer"><FileText size={15} /> Internship certificate <ExternalLink size={13} /></a>}</div></div></Modal>}
  </section>
}

function Skills() {
  return <section className="section wrap" id="skills"><SectionHeader number="05" label="SKILLS" title="Skills and tools." note="Topics and technologies I’ve used in coursework, internships and projects." />
    <div className="skills-layout"><div className="skills-aside"><span className="eyebrow">CURRENT TOOLKIT</span><p>Tools and concepts I’ve worked with in coursework, internships and projects.</p><span className="skills-count">06 <small>AREAS</small></span></div><div className="skill-groups">{skillGroups.map((group, index) => <div className="skill-group" key={group.title}><span className="skill-index">0{index + 1}</span><div><h3>{group.title}</h3><div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div></div></div>)}</div></div>
  </section>
}

function Achievements() {
  const reduced = useReducedMotion()
  return <section className="section wrap" id="achievements"><SectionHeader number="06" label="ACHIEVEMENTS" title="Awards and selections." note="Competition results and selection milestones listed in my resume." />
    <div className="achievement-list">{achievements.map((item, index) => <motion.article key={item.mark} className="achievement-row" initial={reduced ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: reduced ? 0 : .48, delay: reduced ? 0 : index * .08 }}><span className="achievement-mark">{item.mark} /</span><div><h3>{item.title}</h3><p>{item.detail}</p><small>{item.note}</small></div><ArrowUpRight size={17} className="achievement-arrow" /></motion.article>)}</div>
  </section>
}

function Education() {
  const reduced = useReducedMotion()
  return <section className="section wrap" id="education"><SectionHeader number="08" label="EDUCATION" title="Academic background." note="Semester results from my July 2026 transcript." />
    <div className="education-grid"><div className="education-main"><div className="education-entry"><span className="eyebrow">AUG 2024 — AUG 2028 <span className="slash">/</span> IN PROGRESS</span><div className="edu-title-row"><GraduationCap size={20} /><div><h3>Sai University</h3><p>B.Tech · Computing & Data Science</p></div></div><div className="edu-meta"><span>Chennai, Tamil Nadu</span><strong>8.89 <small>/ 10 CGPA</small></strong></div></div><div className="education-entry secondary-edu"><span className="eyebrow">JUN 2022 — APR 2024</span><div className="edu-title-row"><div className="edu-monogram">SR</div><div><h3>SR Junior College for Boys</h3><p>Class XII · Telangana State Board of Intermediate Education</p></div></div><div className="edu-meta"><span>Warangal, Telangana</span><strong>96.9<small>%</small></strong></div></div></div>
      <div className="semester-panel"><div className="semester-heading"><span className="eyebrow">SEMESTER PERFORMANCE</span><span>GPA / 10</span></div>{semesters.map((semester, index) => <div className="semester-row" key={semester.label}><span>{semester.label}</span><div className="gpa-track"><motion.i initial={reduced ? { width: `${semester.gpa * 10}%` } : { width: 0 }} whileInView={{ width: `${semester.gpa * 10}%` }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : index * .1 }} /></div><b>{semester.gpa.toFixed(2)}</b></div>)}<p className="semester-note">SELECTED COURSEWORK: FRONTIERS OF AI · EXPLAINABLE AI · MACHINE LEARNING · LINEAR ALGEBRA · CRYPTOGRAPHY</p></div></div>
  </section>
}

function Documents() {
  return <section className="section wrap documents-section"><SectionHeader number="08A" label="DOCUMENTS" title="Resume and transcript." note="Open or download my current application and academic documents." />
    <div className="document-list">{documents.map((document, index) => <article key={document.label} className="document-row"><div className="document-icon"><FileText size={20} /></div><span className="document-index">0{index + 1}</span><div className="document-details"><h3>{document.label}</h3><p>{document.description}</p></div><span className="document-size">{document.size}</span><a className="button button-text" href={document.href} target="_blank" rel="noreferrer">Open <ArrowUpRight size={15} /></a><DownloadButton href={document.href} filename={document.filename} label="Download" /></article>)}</div>
  </section>
}

function Contact() {
  return <section className="section wrap contact-section" id="contact"><SectionHeader number="09" label="CONTACT" title="Get in touch." note="Interested in research, AI/ML opportunities or software projects? I’d be happy to connect." />
    <div className="contact-grid"><div className="contact-message"><span className="eyebrow">CONTACT DETAILS</span><p>I’m open to AI/ML research opportunities, internships and collaborative projects. Email is a good way to reach me.</p><a className="button button-primary" href={socialLinks.email}>Email me <ArrowUpRight size={15} /></a></div><div className="contact-links"><a href={socialLinks.phone} className="contact-row"><span className="contact-icon"><Phone size={17} /></span><span><small>PHONE</small><b>{profile.phone}</b></span><ArrowUpRight size={15} /></a><a href={socialLinks.email} className="contact-row"><span className="contact-icon"><Mail size={17} /></span><span><small>EMAIL</small><b>Send an email</b></span><ArrowUpRight size={15} /></a><a href={socialLinks.github} className="contact-row" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Github size={17} /></span><span><small>GITHUB</small><b>View my projects</b></span><ArrowUpRight size={15} /></a><a href={socialLinks.linkedin} className="contact-row" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Linkedin size={17} /></span><span><small>LINKEDIN</small><b>Connect with me</b></span><ArrowUpRight size={15} /></a></div></div>
  </section>
}

function Footer() {
  return <footer className="footer wrap"><a className="footer-brand" href="#top"><span>K<span>.</span></span><b>KARTHIK MATETI<small>COMPUTING & DATA SCIENCE · AI / ML / RESEARCH</small></b></a><div className="footer-contact"><a href={socialLinks.phone}>{profile.phone}</a><SocialIconLink kind="github" label="Open GitHub profile"><Github size={16} /></SocialIconLink><SocialIconLink kind="linkedin" label="Open LinkedIn profile"><Linkedin size={16} /></SocialIconLink><SocialIconLink kind="email" label="Send email"><Mail size={16} /></SocialIconLink></div><div className="footer-bottom"><span>© 2026 KARTHIK MATETI</span><span>SAI UNIVERSITY · CHENNAI</span><a href="#top">BACK TO TOP ↑</a></div></footer>
}

function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100, label: '' })
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const move = (event: MouseEvent) => { const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor]'); setPosition({ x: event.clientX, y: event.clientY, label: target?.dataset.cursor ?? '' }) }
    window.addEventListener('mousemove', move, { passive: true }); return () => window.removeEventListener('mousemove', move)
  }, [reduced])
  return <div className={`custom-cursor${position.label ? ' cursor-active' : ''}`} style={{ transform: `translate3d(${position.x}px,${position.y}px,0)` }} aria-hidden="true">{position.label && <span>{position.label}</span>}</div>
}

export default function App() {
  const { open, setOpen } = useCommandPalette()
  const progress = useScrollProgress()
  const closePalette = () => setOpen(false)
  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <Navbar onCommand={() => setOpen(true)} />
    <main><Hero /><div className="hero-divider wrap"><span>RESEARCH DOSSIER / 2026</span><span>01 — 09 <i /></span></div><About /><Experience /><Research /><Projects /><Skills /><Achievements /><Certifications /><Education /><Documents /><Contact /></main>
    <Footer /><CommandPalette open={open} onClose={closePalette} /><Cursor />
    <button className="floating-command" aria-label="Open command palette" onClick={() => setOpen(true)}><Command size={16} /><span>QUICK NAV</span></button>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.displayName, email: profile.email, jobTitle: 'Computing & Data Science Student', alumniOf: { '@type': 'CollegeOrUniversity', name: profile.university }, sameAs: [socialLinks.github, socialLinks.linkedin] }) }} />
  </>
}
