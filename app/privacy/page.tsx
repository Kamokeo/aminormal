import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Am I Normal?',
  description: 'Privacy policy for Am I Normal? — how we handle data, cookies, and third-party services.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>

        <Link
          href="/"
          style={{ color: '#555555', fontSize: 13 }}
          className="transition-colors hover:text-white"
        >
          ← Am I Normal?
        </Link>

        <h1
          className="font-bold"
          style={{ fontSize: 36, marginTop: 32, marginBottom: 8, letterSpacing: '-0.5px' }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: '#555555', fontSize: 13, marginBottom: 48 }}>
          Effective date: April 8, 2026
        </p>

        <Section title="1. Overview">
          <p>
            Am I Normal? (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{' '}
            <a href="https://aminormal.lol" className="underline" style={{ color: '#aaaaaa' }}>
              aminormal.lol
            </a>{' '}
            (the &quot;Site&quot;). This policy explains what information we collect, how we use it,
            and your rights regarding that information.
          </p>
          <p style={{ marginTop: 12 }}>
            We take your privacy seriously. The Site does not require registration, does not create
            user accounts, and does not collect personally identifiable information to participate.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <Subsection title="Anonymous vote data">
            When you answer a question, we record your choice (option A or B) alongside the
            question ID. No name, email address, account, or other identifier is stored with your
            vote. Votes are permanently anonymous.
          </Subsection>
          <Subsection title="Usage data">
            Like most websites, our hosting provider (Vercel) and database provider (Supabase)
            automatically log standard server data including IP addresses, browser type, referring
            URLs, and pages visited. This data is used solely for operating and securing the
            service and is governed by their respective privacy policies.
          </Subsection>
          <Subsection title="Cookies and local storage">
            We use your browser&apos;s <strong>localStorage</strong> to remember which questions
            you have already answered within your current browser, so you are not shown the same
            question twice. No personal information is stored in localStorage.
          </Subsection>
          <Subsection title="Advertising cookies">
            We display advertisements served by <strong>Google AdSense</strong>. Google and its
            partners may use cookies, web beacons, and similar technologies to serve ads based on
            your prior visits to this and other websites. Google&apos;s use of advertising cookies
            enables it and its partners to serve ads based on your visit to our Site and/or other
            sites on the internet.
          </Subsection>
        </Section>

        <Section title="3. How We Use Information">
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li>To display aggregate, anonymous voting percentages to all users</li>
            <li>To prevent duplicate answers within the same browser session</li>
            <li>To monitor Site performance, uptime, and security</li>
            <li>To display relevant advertisements through Google AdSense</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            We do not sell, trade, or otherwise transfer any data to third parties except as
            described in this policy.
          </p>
        </Section>

        <Section title="4. Third-Party Services">
          <p>The Site uses the following third-party services, each governed by its own privacy policy:</p>
          <ul style={{ paddingLeft: 20, lineHeight: 2, marginTop: 12 }}>
            <li>
              <strong style={{ color: '#ffffff' }}>Google AdSense</strong> — advertising platform.{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: '#aaaaaa' }}
              >
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong style={{ color: '#ffffff' }}>Vercel</strong> — hosting and infrastructure.{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: '#aaaaaa' }}
              >
                Vercel Privacy Policy
              </a>
            </li>
            <li>
              <strong style={{ color: '#ffffff' }}>Supabase</strong> — database provider.{' '}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: '#aaaaaa' }}
              >
                Supabase Privacy Policy
              </a>
            </li>
          </ul>
        </Section>

        <Section title="5. Google AdSense and the DART Cookie">
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on our Site.
            Google&apos;s use of the DART cookie enables it to serve ads to our users based on
            their visit to our Site and other sites on the internet. Users may opt out of the use
            of the DART cookie by visiting the{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: '#aaaaaa' }}
            >
              Google ad and content network privacy policy
            </a>
            .
          </p>
        </Section>

        <Section title="6. Your Choices and Opt-Out Options">
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li>
              <strong style={{ color: '#ffffff' }}>Personalized ads:</strong> Visit{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: '#aaaaaa' }}
              >
                Google Ad Settings
              </a>{' '}
              or the{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: '#aaaaaa' }}
              >
                NAI opt-out page
              </a>{' '}
              to opt out of personalised advertising.
            </li>
            <li>
              <strong style={{ color: '#ffffff' }}>Cookies:</strong> You can instruct your browser
              to refuse all cookies or to indicate when a cookie is being sent. Some features of
              the Site may not function properly without cookies.
            </li>
            <li>
              <strong style={{ color: '#ffffff' }}>localStorage:</strong> You can clear your
              browser&apos;s localStorage at any time via your browser settings. This will reset
              your answered-question history.
            </li>
          </ul>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            The Site is not directed to children under 13 years of age. We do not knowingly
            collect personal information from children. If you believe a child has provided
            information to us, please contact us and we will promptly delete it.
          </p>
        </Section>

        <Section title="8. Data Retention">
          <p>
            Anonymous vote counts are retained indefinitely as they constitute aggregate,
            non-personal statistics. Server access logs are retained according to the policies of
            Vercel and Supabase.
          </p>
        </Section>

        <Section title="9. International Users">
          <p>
            The Site is operated from within the European Economic Area and hosted on
            infrastructure that may process data globally. By using the Site you acknowledge that
            your information may be processed in countries outside your own, including the United
            States, in accordance with this policy.
          </p>
          <p style={{ marginTop: 12 }}>
            If you are located in the EEA, UK, or California, you may have additional rights
            including the right to access, correct, or request deletion of data we hold about
            you. Because we do not link any data to identifiable individuals, we are unable to
            fulfil subject-access requests for anonymous vote data. For any other data held by
            our service providers, please contact them directly.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will post the revised policy
            on this page with an updated effective date. Your continued use of the Site after any
            changes constitutes acceptance of the new policy.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            If you have questions about this Privacy Policy, please open an issue or contact us
            via the site&apos;s GitHub repository.
          </p>
        </Section>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid #1e1e1e' }}>
          <Link href="/terms" style={{ color: '#555555', fontSize: 13 }} className="transition-colors hover:text-white">
            Terms of Service →
          </Link>
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        className="font-semibold"
        style={{ fontSize: 18, marginBottom: 12, color: '#ffffff' }}
      >
        {title}
      </h2>
      <div style={{ color: '#aaaaaa', fontSize: 15, lineHeight: 1.75 }}>
        {children}
      </div>
    </section>
  )
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#dddddd', marginBottom: 4 }}>
        {title}
      </h3>
      <p>{children}</p>
    </div>
  )
}
