'use client'

import { useCallback, useRef, useState } from 'react'
import { Question } from '@/lib/supabase'
import { Category, categoryColors } from '@/lib/categoryColors'
import { getAnsweredIds, addAnsweredId } from '@/lib/questions'
import Landing from '@/components/Landing'
import QuestionCard from '@/components/QuestionCard'
import SessionResults from '@/components/SessionResults'
import CategoryFilter from '@/components/CategoryFilter'
import AdSlot from '@/components/AdSlot'
import SiteFooter from '@/components/SiteFooter'

type GameState = 'landing' | 'playing' | 'empty'

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('landing')
  const [category, setCategory] = useState<Category>('all')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionAnswered, setSessionAnswered] = useState(0)
  const [sessionNormal, setSessionNormal] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [slideOut, setSlideOut] = useState(false)
  const [cardKey, setCardKey] = useState(0)
  const [revealActive, setRevealActive] = useState(false)

  // Refs for values that must be current inside stale callbacks
  const fetchingRef = useRef(false)
  const questionsRef = useRef<Question[]>([])
  const currentIndexRef = useRef(0)
  const categoryRef = useRef<Category>('all')
  const sessionAnsweredRef = useRef(0)
  const sessionNormalRef = useRef(0)

  const currentQuestion = questions[currentIndex]
  const categoryColor = currentQuestion
    ? (categoryColors[currentQuestion.category] ?? '#ffffff')
    : (categoryColors[category] ?? '#ffffff')

  // Mobile sticky banner: visible unless the result reveal or results overlay is active
  const mobileBannerVisible = !revealActive && !showResults

  async function fetchQuestions(cat: Category, append = false) {
    if (fetchingRef.current) return
    fetchingRef.current = true
    try {
      const answeredIds = getAnsweredIds()
      const excludeParam = answeredIds.length > 0 ? `&exclude=${answeredIds.join(',')}` : ''
      const catParam = cat !== 'all' ? `category=${cat}` : ''
      const res = await fetch(`/api/questions?${catParam}${excludeParam}`)
      if (!res.ok) return
      const data: Question[] = await res.json()
      if (append) {
        setQuestions((prev) => {
          const merged = [...prev, ...data]
          questionsRef.current = merged
          return merged
        })
      } else {
        questionsRef.current = data
        setQuestions(data)
        setCurrentIndex(0)
        currentIndexRef.current = 0
      }
    } catch {
      // silently fail
    } finally {
      fetchingRef.current = false
    }
  }

  function startGame(cat: Category) {
    categoryRef.current = cat
    sessionAnsweredRef.current = 0
    sessionNormalRef.current = 0
    questionsRef.current = []
    currentIndexRef.current = 0
    setCategory(cat)
    setSessionAnswered(0)
    setSessionNormal(0)
    setShowResults(false)
    setRevealActive(false)
    setCardKey(0)
    setCurrentIndex(0)
    setGameState('playing')
    fetchQuestions(cat, false)
  }

  const advance = useCallback(() => {
    setSlideOut(true)
    setTimeout(() => {
      setRevealActive(false)
      setCurrentIndex((prev) => {
        const next = prev + 1
        currentIndexRef.current = next
        if (next >= questionsRef.current.length) {
          setGameState('empty')
        }
        return next
      })
      setCardKey((k) => k + 1)
      setSlideOut(false)
    }, 250)
  }, [])

  const handleAnswer = useCallback(
    (questionId: string, _option: 'a' | 'b', wasNormal: boolean) => {
      addAnsweredId(questionId)

      // Use refs so the value is always current regardless of closure age
      sessionAnsweredRef.current += 1
      if (wasNormal) sessionNormalRef.current += 1
      const newAnswered = sessionAnsweredRef.current
      setSessionAnswered(newAnswered)
      setSessionNormal(sessionNormalRef.current)

      // Prefetch more questions when running low
      if (questionsRef.current.length - currentIndexRef.current <= 3) {
        fetchQuestions(categoryRef.current, true)
      }

      // Always advance to the next card immediately
      advance()

      // Every 10th answer: show badge/results overlay after the advance animation settles
      if (newAnswered % 10 === 0) {
        setTimeout(() => setShowResults(true), 400)
      }
    },
    [advance]
  )

  function dismissResults() {
    // Card already advanced when the 10th answer was handled — just hide overlay
    setShowResults(false)
  }

  // ── Landing ───────────────────────────────────────────────────────────────
  if (gameState === 'landing') {
    return <Landing onStart={startGame} />
  }

  // ── Empty ─────────────────────────────────────────────────────────────────
  if (gameState === 'empty') {
    const normalPct =
      sessionAnswered > 0 ? Math.round((sessionNormal / sessionAnswered) * 100) : 0
    const tweetText = `I scored ${normalPct}% normal on aminormal.vercel.app 💀 what did you get?`
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ gap: 32 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 48 }}>🎉</p>
          <h2 className="text-white font-bold" style={{ fontSize: 24 }}>
            You&apos;ve seen it all
          </h2>
          <p style={{ color: '#888888', fontSize: 14 }}>New questions added regularly</p>
        </div>

        <div className="w-full" style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CategoryFilter selected={category} onChange={startGame} />
          {/* 728×90 desktop only, below category filter */}
          <div className="hidden md:flex justify-center">
            <AdSlot size="728x90" slot="empty-leaderboard" />
          </div>
        </div>

        <div
          className="w-full"
          style={{
            maxWidth: 360,
            backgroundColor: '#141414',
            border: '1px solid #1e1e1e',
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <p className="text-white font-semibold">
            You answered {sessionAnswered} questions
          </p>
          <p style={{ color: '#888888', fontSize: 14 }}>
            Normal on{' '}
            <span className="text-white font-bold">{sessionNormal}</span> of them (
            {normalPct}%)
          </p>
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
                '_blank',
                'noopener,noreferrer'
              )
            }
            className="w-full flex items-center justify-center gap-2 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              height: 48,
              backgroundColor: '#ffffff',
              color: '#000000',
              borderRadius: 12,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zM17.083 20.01h1.833L7.084 4.126H5.117z" />
            </svg>
            Share your result
          </button>
        </div>

        <button
          onClick={() => setGameState('landing')}
          style={{ color: '#555555', fontSize: 13 }}
          className="transition-colors hover:text-white"
        >
          ← Back to home
        </button>

        <SiteFooter />
      </div>
    )
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Playing ───────────────────────────────────────────────────────────────
  return (
    <>
      {/*
        Main content area.
        Mobile: always pad bottom 58px so content never hides behind the sticky banner.
        Desktop: no bottom padding needed (banner is mobile-only).
      */}
      <main className="min-h-screen flex flex-col pb-[58px] md:pb-0">
        {/* Question card area */}
        <div
          className="flex-1 flex justify-center"
          style={{ padding: '24px 16px' }}
        >
          <div
            className="w-full flex flex-col justify-center"
            style={{ maxWidth: 512, minHeight: '60vh' }}
          >
            <div
              key={cardKey}
              style={{
                opacity: slideOut ? 0 : 1,
                transform: slideOut ? 'translateX(-40px)' : 'translateX(0)',
                transition: 'opacity 250ms ease, transform 250ms ease',
              }}
            >
              <QuestionCard
                question={currentQuestion}
                index={currentIndex}
                total={questions.length}
                onAnswer={handleAnswer}
                onVote={() => setRevealActive(true)}
              />
            </div>

            <button
              onClick={() => setGameState('landing')}
              className="transition-colors hover:text-white"
              style={{ marginTop: 28, color: '#555555', fontSize: 12, alignSelf: 'center' }}
            >
              ← Change category
            </button>
          </div>
        </div>

        {/* 728×90 leaderboard — desktop only, below the question card */}
        <div
          className="hidden md:flex justify-center flex-shrink-0"
          style={{ padding: '0 16px 24px' }}
        >
          <AdSlot size="728x90" slot="playing-bottom" />
        </div>

        <div className="hidden md:block">
          <SiteFooter />
        </div>
      </main>

      {/* 320×50 sticky banner — mobile only, always in DOM during playing.
          Fades out during result reveal and results overlay so it never covers buttons. */}
      <div
        className="fixed md:hidden z-40"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          borderTop: mobileBannerVisible ? '1px solid #1e1e1e' : '1px solid transparent',
          opacity: mobileBannerVisible ? 1 : 0,
          pointerEvents: mobileBannerVisible ? 'auto' : 'none',
          transition: 'opacity 200ms ease',
        }}
      >
        <AdSlot size="320x50" slot="mobile-bottom" />
      </div>

      {/* Session results overlay — every 10 questions */}
      {showResults && (
        <SessionResults
          answeredCount={sessionAnswered}
          normalCount={sessionNormal}
          categoryColor={categoryColor}
          onDismiss={dismissResults}
        />
      )}
    </>
  )
}
