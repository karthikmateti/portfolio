import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function Modal({ title, eyebrow, onClose, children }: { title: string; eyebrow?: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prior = document.activeElement as HTMLElement | null
    const first = ref.current?.querySelector<HTMLElement>('button, a, input, [tabindex="0"]')
    first?.focus()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && ref.current) {
        const nodes = [...ref.current.querySelectorAll<HTMLElement>('button, a, input, [tabindex="0"]')].filter(node => !node.hasAttribute('disabled'))
        if (!nodes.length) return
        if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1)?.focus() }
        if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0]?.focus() }
      }
    }
    document.addEventListener('keydown', keydown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = ''; prior?.focus() }
  }, [onClose])
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><div ref={ref} className="modal-panel" role="dialog" aria-modal="true" aria-label={title}><div className="modal-top"><div><div className="eyebrow">{eyebrow ?? 'DETAILS'}</div><h2>{title}</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button></div>{children}</div></div>
}
