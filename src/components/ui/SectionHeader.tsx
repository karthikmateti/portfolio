import { motion, useReducedMotion } from 'framer-motion'

type Props = { number: string; label: string; title: string; note?: string }
export function SectionHeader({ number, label, title, note }: Props) {
  const reduced = useReducedMotion()
  return <motion.div className="section-head" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1] }}><div className="section-kicker"><span>{number}</span><span className="rule" /><span>{label}</span></div><div className="section-title-row"><h2>{title}</h2>{note && <p>{note}</p>}</div></motion.div>
}
