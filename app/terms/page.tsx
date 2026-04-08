import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Am I Normal?',
  description: 'Terms of service for Am I Normal? — rules for using the site.',
}

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p style={{ color: '#555555', fontSize: 13, marginBottom: 48 }}>
          Effective date: April 8, 2026
        </p>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using <strong style={{ color: '#ffffff' }}>Am I Normal?</strong> at{' '}
            <a href="https://aminormal.lol" className="underline" style={{ color: '#aaaaaa' }}>
              aminormal.lol
            </a>{' '}
            (the &quot;Site&quot;), you agree to be bound by these Terms of Service
            (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
          </p>
        </Section>

        <Section title="2. Description of the Service">
          <p>
            Am I Normal? is a free, anonymous poll website where users answer questions and see
            aggregate percentage breakdowns of how other users responded. The Site does not
            require registration and does not create user accounts. All participation is
            anonymous.
          </p>
        </Section>

        <Section title="3. Use of the Site">
          <p>You agree to use the Site only for lawful purposes. You agree not to:</p>
          <ul style={{ paddingLeft: 20, lineHeight: 2, marginTop: 12 }}>
            <li>Attempt to manipulate, stuff, or artificially inflate vote counts</li>
            <li>Use automated bots, scripts, or tools to interact with the Site</li>
            <li>Interfere with or disrupt the Site&apos;s infrastructure or servers</li>
            <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
            <li>Use the Site in any way that violates applicable local, national, or international law</li>
            <li>Reproduce, duplicate, copy, or exploit any portion of the Site for commercial purposes without express written permission</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            All content on the Site — including but not limited to question text, design,
            graphics, and code — is the property of Am I Normal? and is protected by applicable
            intellectual property laws. You may not reproduce, distribute, or create derivative
            works from any content on the Site without our prior written consent.
          </p>
        </Section>

        <Section title="5. Anonymous Submissions">
          <p>
            Votes submitted through the Site are anonymous and become part of the Site&apos;s
            aggregate dataset. By submitting a vote, you grant us a perpetual, irrevocable,
            royalty-free licence to store and display the aggregated, anonymous result. You retain
            no ownership over anonymous votes once submitted, and we have no ability to identify
            or delete an individual&apos;s vote.
          </p>
        </Section>

        <Section title="6. Third-Party Advertising">
          <p>
            The Site displays advertisements provided by Google AdSense and potentially other
            third-party advertising networks. These advertisements are served by third parties and
            are subject to their own terms of service and privacy policies. We are not responsible
            for the content of third-party advertisements or the practices of advertisers.
          </p>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <p>
            THE SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS
            WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
            TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
            NON-INFRINGEMENT.
          </p>
          <p style={{ marginTop: 12 }}>
            We do not warrant that the Site will be uninterrupted, error-free, or free of
            viruses or other harmful components. Vote percentages displayed on the Site represent
            anonymous user responses and are provided for entertainment purposes only. They do not
            constitute scientific, medical, psychological, or professional advice.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
            PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
            USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR
            ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SITE.
          </p>
        </Section>

        <Section title="9. External Links">
          <p>
            The Site may contain links to third-party websites. These links are provided for
            convenience only. We have no control over the content of those sites and accept no
            responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </Section>

        <Section title="10. Modifications to the Site and Terms">
          <p>
            We reserve the right to modify or discontinue the Site at any time without notice.
            We may also update these Terms at any time by posting the revised Terms on this page
            with an updated effective date. Your continued use of the Site following any changes
            constitutes your acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="11. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of England
            and Wales, without regard to conflict of law principles. Any disputes arising from
            these Terms or your use of the Site shall be subject to the exclusive jurisdiction of
            the courts of England and Wales.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            If you have questions about these Terms, please open an issue or contact us via the
            site&apos;s GitHub repository.
          </p>
        </Section>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid #1e1e1e' }}>
          <Link href="/privacy" style={{ color: '#555555', fontSize: 13 }} className="transition-colors hover:text-white">
            Privacy Policy →
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
