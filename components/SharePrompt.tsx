'use client'

import { useState } from 'react'

type Props = {
  answeredCount: number
  normalCount: number
  onDismiss: () => void
}

export default function SharePrompt({ answeredCount, normalCount, onDismiss }: Props) {
  const [copied, setCopied] = useState(false)

  const url = 'https://aminormal.vercel.app'
  const tweetText = `I just found out if I'm normal on ${url} — apparently I'm normal on ${normalCount}/${answeredCount} questions 👀`

  function shareTwitter() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(tweetUrl, '_blank', 'noopener,noreferrer')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60" onClick={onDismiss}>
      <div
        className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 space-y-5 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-1">
          <p className="text-white text-xl font-bold">You've answered {answeredCount} questions</p>
          <p className="text-secondary text-sm">
            You're normal on <span className="text-white font-semibold">{normalCount}</span> of them
          </p>
        </div>

        <button
          onClick={shareTwitter}
          className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-xl h-12 font-semibold text-sm transition-opacity hover:opacity-90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zM17.083 20.01h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X / Twitter
        </button>

        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 bg-transparent border border-border text-white rounded-xl h-12 font-semibold text-sm transition-colors hover:bg-surface"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied ✓
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy link
            </>
          )}
        </button>

        <button
          onClick={onDismiss}
          className="w-full text-secondary text-sm py-2 hover:text-white transition-colors"
        >
          Keep going →
        </button>
      </div>
    </div>
  )
}
