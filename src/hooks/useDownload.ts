import { useState } from 'react'
import { downloadFile } from '../utils/downloadFile'

export function useDownload() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const startDownload = async (url: string, filename: string) => {
    setDownloading(filename)
    try {
      await downloadFile(url, filename)
    } catch {
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = filename
      anchor.click()
    } finally {
      setDownloading(null)
    }
  }
  return { downloading, startDownload }
}
