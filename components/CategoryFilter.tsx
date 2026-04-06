'use client'

import { categoryColors, categoryEmoji, categoryLabels, Category } from '@/lib/categoryColors'

const CATEGORIES: Category[] = [
  'all', 'habits', 'food', 'work', 'relationships', 'social', 'sleep', 'money', 'spicy',
]

type Props = {
  selected: Category
  onChange: (cat: Category) => void
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full"
      style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      {CATEGORIES.map((cat) => {
        const color = categoryColors[cat]
        const isSelected = selected === cat
        const emoji = categoryEmoji[cat]
        const label = categoryLabels[cat]
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap transition-all duration-200"
            style={{
              backgroundColor: isSelected ? color : 'transparent',
              borderColor: color,
              color: isSelected ? '#0a0a0a' : color,
            }}
          >
            {emoji && <span>{emoji}</span>}
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
