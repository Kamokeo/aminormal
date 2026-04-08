import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Am I Normal? — Anonymous questions. Honest percentages.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), 'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 96,
            fontFamily: 'Geist',
            fontWeight: 700,
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          Am I Normal?
        </span>
        <span
          style={{
            color: '#888888',
            fontSize: 32,
            fontFamily: 'Geist',
            fontWeight: 400,
            letterSpacing: '0px',
            lineHeight: 1,
          }}
        >
          Anonymous questions. Honest percentages.
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist', data: fontData, style: 'normal', weight: 400 }],
    }
  )
}
