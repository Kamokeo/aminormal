'use client'

import { useState } from 'react'
import { getBadgeData } from '@/lib/votes'
import AdSlot from './AdSlot'

type Props = {
  answeredCount: number
  normalCount: number
  categoryColor: string
  onDismiss: () => void
}

export default function SessionResults({ answeredCount, normalCount, categoryColor, onDismiss }: Props) {
  const [copied, setCopied] = useState(false)

  const normalPct = answeredCount > 0 ? Math.round((normalCount / answeredCount) * 100) : 0
  const badge = getBadgeData(normalPct)
  const url = 'https://aminormal.vercel.app'
  const shareText = `I got ${badge.full} on ${url}\n— apparently I'm ${normalPct}% normal 💀 what did you get?`

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(shareText)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = shareText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center animate-fade-in">

        {/* Badge */}
        <div className="flex flex-col items-center gap-2">
          <div style={{ fontSize: 72, lineHeight: 1 }}>{badge.emoji}</div>
          <h2 className="font-black text-white" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>
            {badge.name}
          </h2>
          <div
            className="font-black tabular-nums"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', color: categoryColor }}
          >
            {normalPct}% normal
          </div>
          <p style={{ color: '#888888', fontSize: 13 }}>
            Based on {answeredCount} questions
          </p>
        </div>

        {/* 300×250 ad — centered, both mobile and desktop */}
        <AdSlot size="300x250" slot="results-inline" />

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={shareTwitter}
            className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ height: 52, backgroundColor: '#ffffff', color: '#000000' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zM17.083 20.01h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X →
          </button>

          <button
            onClick={copyResult}
            className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-colors"
            style={{
              height: 52,
              backgroundColor: 'transparent',
              border: '1px solid #1e1e1e',
              color: copied ? categoryColor : '#ffffff',
            }}
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied ✓
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy result
              </>
            )}
          </button>
        </div>

        <button
          onClick={onDismiss}
          className="transition-colors"
          style={{ color: '#888888', fontSize: 14 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
        >
          Keep going →
        </button>
      </div>
    </div>
  )
}
