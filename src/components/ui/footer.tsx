"use client";

import Link from 'next/link'
import {
    Globe, 
    Terminal, // Using Terminal to represent TryHackMe
} from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.35 6.5-1.5 6.5-7.15A5.2 5.2 0 0 0 19.3 4.14a5.1 5.1 0 0 0-.1-3.95s-1.07-.34-3.5 1.31a11.4 11.4 0 0 0-6.4 0C6.87 1.2 5.8 1.54 5.8 1.54a5.1 5.1 0 0 0-.1 3.96A5.2 5.2 0 0 0 4.3 8.35c0 5.62 3.32 6.78 6.5 7.15-0.6.54-1.1 1.53-1.1 3.03V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const links = [
    {
        title: 'Home',
        href: '#home',
    },
    {
        title: 'About',
        href: '#about',
    },
    {
        title: 'Projects',
        href: '#projects',
    },
    {
        title: 'Skills',
        href: '#skills',
    },
    {
        title: 'Contact',
        href: '#contact',
    }
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-5xl px-6 flex flex-col items-center">
                <Link
                    href="#home"
                    aria-label="go home"
                    className="mx-auto block w-fit font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50 mb-8"
                >
                    SS.
                </Link>

                <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-neutral-500 hover:text-[#3b5bdb] dark:text-neutral-400 dark:hover:text-[#6b8cff] transition-colors duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="mb-12 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="/"
                        aria-label="Portfolio"
                        className="text-neutral-500 hover:text-[#3b5bdb] dark:text-neutral-400 dark:hover:text-[#6b8cff] transition-colors block">
                        <Globe className="size-6" /> 
                    </Link>
                    <Link
                        href="https://github.com/SaadSaid158"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-neutral-500 hover:text-[#3b5bdb] dark:text-neutral-400 dark:hover:text-[#6b8cff] transition-colors block">
                        <GithubIcon className="size-6" /> 
                    </Link>
                    <Link
                        href="https://tryhackme.com/p/Saad.Said158"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TryHackMe"
                        className="text-neutral-500 hover:text-[#3b5bdb] dark:text-neutral-400 dark:hover:text-[#6b8cff] transition-colors block">
                        <Terminal className="size-6" /> 
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-neutral-500 hover:text-[#3b5bdb] dark:text-neutral-400 dark:hover:text-[#6b8cff] transition-colors block">
                        <LinkedinIcon className="size-6" /> 
                    </Link>
                </div>
                <span className="text-neutral-500 dark:text-neutral-400 block text-center text-sm mb-4">
                    © {new Date().getFullYear()} Saad Said. All rights reserved.
                </span>
                <span className="text-neutral-400 dark:text-neutral-500 block text-center text-xs opacity-80">
                    made with ❤️ and 💻 (and a little ☕) by SaadSaid158
                </span>
            </div>
        </footer>
    )
}
