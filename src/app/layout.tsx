import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const siteUrl = 'https://saadsaid158.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Saad Said | Security Researcher & Exploit Developer',
    template: '%s | Saad Said',
  },
  description:
    'Saad Said (saadsaid158) — security researcher, exploit developer, and reverse engineer based in the UK. Specialises in Go, C, Rust, CVE research, red teaming, and offensive security tooling.',
  keywords: [
    'Saad Said',
    'saadsaid158',
    'Saad Said security researcher',
    'Saad Said exploit developer',
    'Saad Said portfolio',
    'Saad Said GitHub',
    'saadsaid158 GitHub',
    'saadsaid158 portfolio',
    'security researcher',
    'exploit developer',
    'reverse engineer',
    'offensive security',
    'CVE research',
    'red team',
    'C2 framework',
    'command and control framework',
    'malware development',
    'vulnerability research',
    'Go developer',
    'C programmer',
    'Rust',
    'Fusée Gelée',
    'CVE-2018-6242',
    'Nintendo Switch exploit',
    'chess engine Go',
    'Metasploit',
    'Burp Suite',
    'Ghidra',
    'Wireshark',
    'UK security researcher',
    'UK exploit developer',
    'A-Level security researcher',
    'TryHackMe',
    'portfolio',
  ],
  authors: [{ name: 'Saad Said', url: siteUrl }],
  creator: 'Saad Said',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Saad Said',
    title: 'Saad Said | Security Researcher & Exploit Developer',
    description:
      'Portfolio of Saad Said (saadsaid158) — security researcher, exploit developer, and reverse engineer from the UK. 10+ public projects, CVE research, Go · C · Rust.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Saad Said — Security Researcher & Exploit Developer',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saad Said | Security Researcher & Exploit Developer',
    description:
      'Portfolio of Saad Said (saadsaid158) — security researcher, exploit developer, and reverse engineer from the UK.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'JuO54Cah6-yjU9S6xevy-uDHfwbNtnR4ZCuSuG9o0Nk',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saad Said',
  alternateName: ['saadsaid158', 'Saad Said 158', 'Saad.Said158'],
  url: siteUrl,
  sameAs: [
    'https://github.com/SaadSaid158',
    'https://tryhackme.com/p/Saad.Said158',
    'https://saadsaid158.github.io',
  ],
  jobTitle: 'Security Researcher & Exploit Developer',
  description:
    'Security researcher, exploit developer, and reverse engineer based in the UK. Specialising in offensive security, CVE research, red teaming, C2 framework development, Go, C, and Rust.',
  knowsAbout: [
    'Exploit Development',
    'Reverse Engineering',
    'Offensive Security',
    'Vulnerability Research',
    'Malware Research',
    'Red Teaming',
    'Command and Control Frameworks',
    'CVE Research',
    'CVE-2018-6242',
    'Fusée Gelée',
    'Go',
    'C',
    'Rust',
    'Python',
    'Bash',
    'Linux',
    'Ghidra',
    'Metasploit',
    'Burp Suite',
    'Wireshark',
    'Privilege Escalation',
    'Network Analysis',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Security Researcher',
    occupationLocation: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="google-site-verification" content="JuO54Cah6-yjU9S6xevy-uDHfwbNtnR4ZCuSuG9o0Nk" />
      </head>
      <body className={GeistSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
