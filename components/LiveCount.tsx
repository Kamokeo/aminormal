'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LiveCount() {
  const [display, setDisplay] = useState<number | 'fallback' | null>(null)
  const displayRef = useRef(0)
  const rafRef = useRef<number>(0)

  // animateTo is stable: only uses refs and the stable setDisplay setter.
  // We define it outside useEffect and capture it via closure in the effect.
  function animateTo(target: number) {
    cancelAnimationFrame(rafRef.current)
    const start = displayRef.current
    const duration = 1000
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = Math.floor(start + (target - start) * eased)
      displayRef.current = val
      setDisplay(val)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        displayRef.current = target
        setDisplay(target)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    fetch('/api/count')
      .then((r) => r.json())
      .then(({ count: c }: { count: number }) => {
        displayRef.current = 0
        animateTo(c)
      })
      .catch(() => setDisplay('fallback'))

    const channel = supabase
      .channel('votes-count')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'votes' },
        () => animateTo(displayRef.current + 1)
      )
      .subscribe()

    return () => {
      cancelAnimationFrame(rafRef.current)
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (display === null) return null

  return (
    <p className="text-sm tabular-nums" style={{ color: '#888888' }}>
      {display === 'fallback' ? (
        <>
          <span className="text-white font-semibold">Thousands of</span> answers worldwide
        </>
      ) : (
        <>
          <span className="text-white font-semibold">{display.toLocaleString()}</span> answers worldwide
        </>
      )}
    </p>
  )
}
