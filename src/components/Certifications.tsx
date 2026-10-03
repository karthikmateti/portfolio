import { useMemo, useState } from 'react'
import { ArrowDownUp, ArrowUpRight, Award, ChevronDown, ExternalLink, Search, X } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { certifications, certificationFilters, type Certification, type CertificateCategory } from '../data/certifications'
import { SectionHeader } from './ui/SectionHeader'
import { Badge } from './ui/Badge'
import { Modal } from './ui/Modal'

function matches(item: Certification, query: string) {
  const text = [item.title, item.issuer, item.category, item.date, ...(item.variants?.map(v => v.title) ?? [])].join(' ').toLowerCase()
  return text.includes(query.toLowerCase())
}
function hasAiMlFocus(item: Certification) {
  return /artificial intelligence|\bai\b|deep learning|gpt|generative|prompt engineering|natural language|computer vision|genai/i.test(item.title)
}

export function Certifications() {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<(typeof certificationFilters)[number]>('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Newest')
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<Certification | null>(null)
  const filtered = useMemo(() => certifications.filter(item => (filter === 'All' || item.category === filter || (filter === 'AI/ML' && hasAiMlFocus(item))) && matches(item, search)).sort((a, b) => {
    if (sort === 'Issuer') return a.issuer.localeCompare(b.issuer) || a.title.localeCompare(b.title)
    const date = (value: string) => new Date(`${value} 1`).getTime()
    return sort === 'Oldest' ? date(a.date) - date(b.date) : date(b.date) - date(a.date)
  }), [filter, search, sort])
  const featured = filtered.filter(item => item.featured)
  const regular = filtered.filter(item => !item.featured)
  const infosys = regular.filter(item => item.group === 'Infosys Springboard')
  const other = regular.filter(item => !item.group)
  const hasInfosysQuery = search.toLowerCase().includes('infosys')
  const showInfosys = infosys.length > 0 && (expanded || hasInfosysQuery)
  const groupedFilter = filter === 'All' || filter === 'Course'
  const count = certifications.length
  const hackathonCount = certifications.filter(item => item.category === 'Hackathon').length

  return <section className="section wrap" id="certifications">
    <SectionHeader number="07" label="CERTIFICATIONS" title="Certificates and competitions." note="Courses, memberships and competition results." />
    <div className="cert-stats"><div><span>CERTIFICATES</span><b>{String(count).padStart(2, '0')}</b></div><div><span>HACKATHONS</span><b>{String(hackathonCount).padStart(2, '0')}</b></div><div className="cert-source-note"><span>COURSES</span><b>{String(certifications.filter(item => item.category === 'Course').length).padStart(2, '0')}</b></div></div>
    <div className="cert-feature-head"><span className="eyebrow">FEATURED</span><span className="eyebrow">{String(featured.length).padStart(2, '0')} RECORDS</span></div>
    <div className="featured-certs">{featured.map((item, index) => <motion.button key={item.id} className={`featured-cert${item.id === 'convolve' ? ' featured-accent' : ''}`} onClick={() => setSelected(item)} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .07 }}>
      <span className="featured-number">0{index + 1}</span><span className="cert-ornament"><Award size={21} strokeWidth={1.3} /></span><span className="featured-category">{item.category.toUpperCase()}</span><b>{item.title.replace(' - A Pan-IIT AI/ML Hackathon', '')}</b><span className="featured-result">{item.highlight ?? item.date}<ArrowUpRight size={14} /></span>
    </motion.button>)}</div>

    <div className="archive-heading"><div><span className="eyebrow">ALL CERTIFICATIONS</span><h3>All records <span>({filtered.length})</span></h3></div><label className="cert-search"><Search size={16} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search certificates…" aria-label="Search certificates" />{search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={15} /></button>}</label></div>
    <div className="cert-controls"><div className="cert-filters" role="group" aria-label="Filter certificates">{certificationFilters.map(category => <button key={category} className={filter === category ? 'selected' : ''} onClick={() => setFilter(category as typeof filter)}>{category === 'AI/ML' ? 'AI / ML' : category.toUpperCase()}</button>)}</div><label className="sort-select"><ArrowDownUp size={13} /><span className="sr-only">Sort certificates</span><select value={sort} onChange={event => setSort(event.target.value)}><option>Newest</option><option>Oldest</option><option>Issuer</option></select></label></div>
    <div className="cert-list">
      {groupedFilter && infosys.length > 0 && <div className={`cert-group${showInfosys ? ' expanded' : ''}`}>
        <button className="cert-group-toggle" aria-expanded={showInfosys} onClick={() => setExpanded(value => !value)}><span className="cert-index">G / 01</span><span className="cert-row-main"><b>Infosys Springboard</b><small>Infosys Springboard · June 2025</small></span><span className="cert-category">18 CERTIFICATES</span><ChevronDown className="group-chevron" size={18} /></button>
        {showInfosys && <div className="cert-group-items">{infosys.map((item, index) => <CertificateRow key={item.id} item={item} index={index + 1} onOpen={setSelected} compact />)}</div>}
      </div>}
      {other.map((item, index) => <CertificateRow key={item.id} item={item} index={index + 1} onOpen={setSelected} />)}
      {!other.length && !infosys.length && featured.length === 0 && <div className="empty-state">No records match this search. Try another title, issuer or category.</div>}
    </div>
    <p className="cert-disclaimer">Certificates from the same provider or event are grouped together.</p>
    {selected && <Modal title={selected.title} eyebrow={`${selected.category.toUpperCase()} / ${selected.date.toUpperCase()}`} onClose={() => setSelected(null)}>
      <div className="certificate-preview"><div className="preview-grid" /><div className="preview-stamp"><Award size={35} strokeWidth={1} /></div><span className="preview-kicker">CERTIFICATE RECORD</span><h3>{selected.title}</h3><p>{selected.issuer}</p><span className="preview-date">ISSUED · {selected.date.toUpperCase()}</span>{selected.highlight && <Badge>{selected.highlight}</Badge>}</div>
      {selected.variants && <div className="variant-list"><span className="eyebrow">RELATED RECORDS</span>{selected.variants.map(item => <div key={item.title}>{item.title}</div>)}</div>}
      <div className="modal-actions"><span className="modal-note">Contact me if you need to see this certificate.</span>{(selected as Certification & { credentialUrl?: string }).credentialUrl && <a className="button button-primary" href={(selected as Certification & { credentialUrl?: string }).credentialUrl} target="_blank" rel="noopener noreferrer">Open credential <ExternalLink size={14} /></a>}</div>
    </Modal>}
  </section>
}

function CertificateRow({ item, index, onOpen, compact = false }: { item: Certification; index: number; onOpen: (item: Certification) => void; compact?: boolean }) {
  return <div className={`cert-row${compact ? ' cert-row-compact' : ''}`}><span className="cert-index">{String(index).padStart(2, '0')} / {item.date.slice(-4)}</span><span className="cert-row-main"><b>{item.title}</b><small>{item.issuer}{item.variants ? ` · ${item.variants.length} related records` : ''}</small>{compact && item.group && <span className="compact-classifier">INFOSYS SPRINGBOARD</span>}</span><Badge muted>{item.category as CertificateCategory}</Badge><span className="cert-date">{item.date.toUpperCase()}</span><button className="cert-open" aria-label={`View ${item.title}`} onClick={() => onOpen(item)}><ArrowUpRight size={16} /></button></div>
}
