import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 24,
        paddingTop: 8,
      }}
    >
      <Link
        href="/privacy"
        style={{ color: '#555555', fontSize: 12 }}
        className="transition-colors hover:text-white"
      >
        Privacy Policy
      </Link>
      <Link
        href="/terms"
        style={{ color: '#555555', fontSize: 12 }}
        className="transition-colors hover:text-white"
      >
        Terms of Service
      </Link>
    </footer>
  )
}
