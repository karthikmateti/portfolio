export function Badge({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) { return <span className={`badge${muted ? ' badge-muted' : ''}`}>{children}</span> }
