'use client'

import { Category } from '@/lib/categoryColors'
import CategoryFilter from './CategoryFilter'
import LiveCount from './LiveCount'
import AdSlot from './AdSlot'

type Props = {
  onStart: (category: Category) => void
}

export default function Landing({ onStart }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
      style={{ gap: 32 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1
          className="text-white font-black leading-none"
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
        >
          Am I Normal?
        </h1>
        <p style={{ color: '#888888', fontSize: 16, maxWidth: 340, margin: '0 auto', lineHeight: 1.6 }}>
          Anonymous questions. Honest percentages. No judgment.
        </p>
      </div>

      <LiveCount />

      <div className="w-full" style={{ maxWidth: 560 }}>
        <CategoryFilter selected="all" onChange={onStart} />
      </div>

      {/* 728×90 leaderboard — desktop only, below category filter */}
      <div className="hidden md:flex justify-center w-full" style={{ maxWidth: 760 }}>
        <AdSlot size="728x90" slot="landing-leaderboard" />
      </div>

      <button
        onClick={() => onStart('all')}
        className="font-bold transition-opacity hover:opacity-90 active:opacity-80"
        style={{
          padding: '16px 40px',
          backgroundColor: '#ffffff',
          color: '#000000',
          borderRadius: 12,
          fontSize: 16,
        }}
      >
        Find out →
      </button>

      <p style={{ color: '#555555', fontSize: 12, maxWidth: 260 }}>
        Pick a category above to start there instead
      </p>
    </div>
  )
}
