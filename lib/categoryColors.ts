export const categoryColors: Record<string, string> = {
  habits: '#f59e0b',
  food: '#22c55e',
  work: '#3b82f6',
  relationships: '#ec4899',
  social: '#a855f7',
  sleep: '#06b6d4',
  money: '#eab308',
  all: '#ffffff',
}

export const categoryEmoji: Record<string, string> = {
  habits: '⚡',
  food: '🍕',
  work: '💼',
  relationships: '💬',
  social: '🎉',
  sleep: '😴',
  money: '💰',
  all: '✨',
}

export const categoryLabels: Record<string, string> = {
  habits: 'Habits',
  food: 'Food',
  work: 'Work',
  relationships: 'Relationships',
  social: 'Social',
  sleep: 'Sleep',
  money: 'Money',
  all: 'All',
}

export type Category = keyof typeof categoryColors
