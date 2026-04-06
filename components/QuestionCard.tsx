'use client'

import { useState, useCallback } from 'react'
import { categoryColors, categoryLabels, categoryEmoji } from '@/lib/categoryColors'
import { Question } from '@/lib/supabase'
import ResultReveal from './ResultReveal'

type Props = {
  question: Question
  index: number
  total: number
  onAnswer: (questionId: string, option: 'a' | 'b', wasNormal: boolean) => void
  onVote?: () => void
}

type RevealData = {
  pctA: number
  pctB: number
  chosenPct: number
  totalAnswers: number
}

function AnswerButton({
  label,
  color,
  onClick,
  disabled,
}: {
  label: string
  color: string
  onClick: () => void
  disabled: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => !disabled && setPressed(true)}
      onTouchEnd={() => {
        setPressed(false)
        if (!disabled) onClick()
      }}
      style={{
        height: 60,
        backgroundColor: hovered || pressed ? '#1a1a1a' : '#141414',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: hovered || pressed ? color : '#1e1e1e',
        borderLeftWidth: hovered || pressed ? '4px' : '1px',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'border-color 150ms ease, background-color 150ms ease, transform 100ms ease',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      className="w-full px-5 text-left text-white text-sm font-medium rounded-xl"
    >
      {label}
    </button>
  )
}

export default function QuestionCard({ question, index, total, onAnswer, onVote }: Props) {
  const [chosen, setChosen] = useState<'a' | 'b' | null>(null)
  // null = waiting for vote data; set only after fetch resolves so animation plays once
  const [revealData, setRevealData] = useState<RevealData | null>(null)

  const color = categoryColors[question.category] ?? '#ffffff'
  const progress = (index / Math.max(total, 1)) * 100

  const submitVote = useCallback(
    async (opt: 'a' | 'b') => {
      if (chosen) return
      onVote?.()
      setChosen(opt)

      try {
        const res = await fetch('/api/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question_id: question.id, option: opt }),
        })
        if (res.ok) {
          const data: { a: number; b: number } = await res.json()
          const t = data.a + data.b || 1
          const pA = Math.round((data.a / t) * 100)
          const pB = 100 - pA
          const chosenPct = opt === 'a' ? pA : pB
          setRevealData({ pctA: pA, pctB: pB, chosenPct, totalAnswers: t })
          setTimeout(() => onAnswer(question.id, opt, chosenPct >= 50), 2700)
        } else {
          setRevealData({ pctA: 50, pctB: 50, chosenPct: 50, totalAnswers: 100 })
          setTimeout(() => onAnswer(question.id, opt, true), 2700)
        }
      } catch {
        setRevealData({ pctA: 50, pctB: 50, chosenPct: 50, totalAnswers: 100 })
        setTimeout(() => onAnswer(question.id, opt, true), 2700)
      }
    },
    [chosen, question.id, onAnswer, onVote]
  )

  const emoji = categoryEmoji[question.category]
  const label = categoryLabels[question.category]

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {emoji ? `${emoji} ` : ''}{label}
        </span>
        <span className="text-sm tabular-nums" style={{ color: '#888888' }}>
          {index + 1} / {total}
        </span>
      </div>

      {/* Question */}
      <h2
        className="text-white font-bold text-center leading-snug"
        style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)' }}
      >
        {question.text}
      </h2>

      {/* Answers → loading dots → result reveal */}
      {!chosen ? (
        <div className="flex flex-col gap-3 w-full">
          {(['a', 'b'] as const).map((opt) => (
            <AnswerButton
              key={opt}
              label={opt === 'a' ? question.option_a : question.option_b}
              color={color}
              onClick={() => submitVote(opt)}
              disabled={false}
            />
          ))}
        </div>
      ) : revealData === null ? (
        // Waiting for vote data — show pulsing dots in category color
        <div className="flex justify-center py-8">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: color, animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      ) : (
        // revealData is set → ResultReveal mounts ONCE with final values → single smooth animation
        <ResultReveal
          question={question}
          chosen={chosen}
          pctA={revealData.pctA}
          pctB={revealData.pctB}
          chosenPct={revealData.chosenPct}
          totalAnswers={revealData.totalAnswers}
        />
      )}

      {/* Progress bar */}
      <div className="w-full rounded-full overflow-hidden" style={{ height: 3, backgroundColor: '#1e1e1e' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
