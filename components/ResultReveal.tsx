'use client'

import { useEffect, useRef, useState } from 'react'
import { categoryColors } from '@/lib/categoryColors'
import { getVerdict } from '@/lib/votes'
import { Question } from '@/lib/supabase'

type Props = {
  question: Question
  chosen: 'a' | 'b'
  pctA: number
  pctB: number
  chosenPct: number
  totalAnswers: number
}

export default function ResultReveal({ question, chosen, pctA, pctB, chosenPct, totalAnswers }: Props) {
  const color = categoryColors[question.category] ?? '#ffffff'
  const verdict = getVerdict(chosenPct)

  const [barA, setBarA] = useState(0)
  const [barB, setBarB] = useState(0)
  const [displayPct, setDisplayPct] = useState(0)
  const rafRef = useRef<number>(0)

  // Capture targets at mount time — component only mounts once data is loaded,
  // so this single animation always runs 0 → final values.
  useEffect(() => {
    const tA = pctA
    const tB = pctB
    const tPct = chosenPct
    const duration = 700
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setBarA(Math.round(tA * eased))
      setBarB(Math.round(tB * eased))
      setDisplayPct(Math.round(tPct * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full space-y-4">
      <div className="space-y-3 w-full">
        {(['a', 'b'] as const).map((opt) => {
          const isChosen = chosen === opt
          const barPct = opt === 'a' ? barA : barB
          const label = opt === 'a' ? question.option_a : question.option_b

          return (
            <div
              key={opt}
              className="relative w-full rounded-xl overflow-hidden"
              style={{
                height: 60,
                border: `1px solid ${isChosen ? color : '#1e1e1e'}`,
                boxShadow: isChosen ? `0 0 12px ${color}66` : 'none',
                transition: 'box-shadow 300ms ease',
              }}
            >
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${barPct}%`,
                  backgroundColor: isChosen ? color : '#333333',
                  opacity: 0.25,
                  transition: 'none',
                  borderRadius: 'inherit',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <span className="text-white text-sm font-medium pr-3 leading-tight">{label}</span>
                <span
                  className="text-sm font-bold tabular-nums flex-shrink-0"
                  style={{ color: isChosen ? color : '#888888' }}
                >
                  {opt === 'a' ? barA : barB}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center space-y-1 pt-1">
        <div className="font-black tabular-nums" style={{ fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', color }}>
          {displayPct}%
        </div>
        <div className="text-white text-lg font-semibold">
          {verdict.text} {verdict.emoji}
        </div>
        <div style={{ color: '#888888', fontSize: 12 }}>
          Based on {totalAnswers.toLocaleString()} answers
        </div>
      </div>
    </div>
  )
}
