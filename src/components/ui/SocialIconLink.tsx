import type { ReactNode } from 'react'
import { socialLinks } from '../../data/socialLinks'

export function SocialIconLink({ kind, children, label, className = '' }: { kind: keyof typeof socialLinks; children: ReactNode; label: string; className?: string }) {
  const href = socialLinks[kind]
  const external = kind === 'github' || kind === 'linkedin'
  return <a className={`social-link ${className}`} href={href} aria-label={label} title={label} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
}
