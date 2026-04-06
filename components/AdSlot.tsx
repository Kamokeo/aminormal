type AdSize = '320x50' | '728x90' | '300x250' | '300x600'

const dimensions: Record<AdSize, { w: number; h: number }> = {
  '320x50':  { w: 320, h: 50  },
  '728x90':  { w: 728, h: 90  },
  '300x250': { w: 300, h: 250 },
  '300x600': { w: 300, h: 600 },
}

type Props = {
  size: AdSize
  slot: string
  className?: string
}

export default function AdSlot({ size, slot, className = '' }: Props) {
  const { w, h } = dimensions[size]
  return (
    <div
      data-ad-slot={slot}
      className={className}
      style={{
        width: w,
        height: h,
        minHeight: h,
        maxWidth: '100%',
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Replace with your AdSense code */}
      <span style={{ color: '#444', fontSize: 12, userSelect: 'none' }}>Advertisement</span>
    </div>
  )
}
