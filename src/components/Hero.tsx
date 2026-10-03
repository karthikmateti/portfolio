import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { socialLinks } from '../data/socialLinks'
import { DownloadButton } from './ui/DownloadButton'

const words = ['AI SYSTEMS', 'AGENTIC AI', 'EXPLAINABLE AI', 'PRIVACY-PRESERVING ML', 'RESEARCH']
export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => { if (reduced) return; const timer = window.setInterval(() => setWordIndex(i => (i + 1) % words.length), 2600); return () => window.clearInterval(timer) }, [reduced])
  return <section className="hero wrap" id="top" aria-labelledby="hero-title">
    <div className="hero-left">
      <div className="hero-overline"><span className="live-dot" /> COMPUTING & DATA SCIENCE <span className="slash">/</span> AI · ML · RESEARCH</div>
      <motion.h1 id="hero-title" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><span>Karthik</span><span>Mateti</span></motion.h1>
      <div className="hero-subline"><span>FOCUS /</span><span className="rotating-word" aria-live="polite">{words[wordIndex]}</span></div>
      <p className="hero-copy">I’m studying AI and machine learning, with a focus on language models, agentic systems and privacy-preserving ML.</p>
      <div className="hero-status"><span className="status-light" />{profile.opportunityStatus}</div>
      <div className="hero-buttons"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={16} /></a><DownloadButton href="/documents/Mateti_Karthik_Resume.pdf" filename="Mateti_Karthik_Resume.pdf" label="Download resume" /></div>
      <div className="hero-social"><span className="micro">CONNECT</span><span className="micro-rule" /><a aria-label="Open GitHub profile" href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={17} /></a><a aria-label="Open LinkedIn profile" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /></a><a aria-label="Send email" href={socialLinks.email}><Mail size={17} /></a></div>
    </div>
    <div className="hero-art">
      <div className="portrait-index">PROFILE <span>COMPUTING & DATA SCIENCE</span></div>
      <div className="portrait-frame"><img src="/images/karthik.jpg" alt="Portrait of Karthik Mateti" fetchPriority="high" /><div className="portrait-corner portrait-corner-a" /><div className="portrait-corner portrait-corner-b" /><div className="portrait-side">SAI UNIVERSITY · 2024—28</div><div className="portrait-label"><span>KARTHIK MATETI</span><span>AI & MACHINE LEARNING<br />SAI UNIVERSITY</span></div></div>
      <div className="portrait-meta"><div><span>DEGREE</span><b>Computing & Data Science</b></div><div><span>CUMULATIVE GPA</span><b>8.89 <i>/ 10</i></b></div><ArrowUpRight className="portrait-arrow" size={19} /></div>
      <div className="hero-coordinate">CHENNAI, TAMIL NADU</div>
    </div>
    <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
  </section>
}
