export type VoteCounts = {
  a: number
  b: number
}

const localCache: Record<string, VoteCounts> = {}

export function getCachedVotes(questionId: string): VoteCounts | null {
  return localCache[questionId] ?? null
}

export function setCachedVotes(questionId: string, counts: VoteCounts): void {
  localCache[questionId] = counts
}

export function getVerdict(pct: number): { text: string; emoji: string } {
  if (pct >= 65) return { text: 'Totally normal', emoji: '😌' }
  if (pct >= 50) return { text: "You're not alone", emoji: '👋' }
  if (pct >= 35) return { text: 'A bit different', emoji: '🤔' }
  return { text: 'Built different', emoji: '🦄' }
}

export function getBadgeData(normalPct: number): { emoji: string; name: string; full: string } {
  if (normalPct >= 80) return { emoji: '🤖', name: 'Certified NPC', full: 'Certified NPC 🤖' }
  if (normalPct >= 60) return { emoji: '👋', name: 'Pretty Mid', full: 'Pretty Mid 👋' }
  if (normalPct >= 40) return { emoji: '🎲', name: 'The Wildcard', full: 'The Wildcard 🎲' }
  if (normalPct >= 20) return { emoji: '💀', name: 'Cooked fr', full: 'Cooked fr 💀' }
  return { emoji: '🚔', name: 'Straight to Jail', full: 'Straight to Jail 🚔' }
}
