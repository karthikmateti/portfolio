import { useState } from 'react'
import { ArrowDownToLine, Check, LoaderCircle } from 'lucide-react'
import { useDownload } from '../../hooks/useDownload'

export function DownloadButton({ href, filename, label }: { href: string; filename: string; label: string }) {
  const { downloading, startDownload } = useDownload()
  const [error, setError] = useState(false)
  const loading = downloading === filename
  return <span className="download-wrap"><button className="button button-secondary" onClick={async () => { setError(false); try { await startDownload(href, filename) } catch { setError(true) } }} disabled={loading}>
    {loading ? <LoaderCircle className="spin" size={15} /> : error ? <Check size={15} /> : <ArrowDownToLine size={15} />}{loading ? 'Preparing…' : error ? 'Try open file' : label}
  </button>{error && <a className="download-error" href={href} target="_blank" rel="noreferrer">Open PDF</a>}</span>
}
