"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight, ChevronUp } from "lucide-react"

import SkyToggle from "@/components/ui/sky-toggle"
import { MenuVertical } from "@/components/ui/menu-vertical"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { StarButton } from "@/components/ui/star-button"
import FooterSection from "@/components/ui/footer"
import { HexRadar } from "@/components/ui/hex-radar"

// ─── Count-Up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || target === 0) return
    const steps = 40
    const stepTime = duration / steps
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, stepTime)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}

const StatCard = ({ value, label, i }: { value: string; label: string; i: number }) => {
  const numericMatch = value.match(/^(\d+)(.*)$/)
  const numeric = numericMatch ? parseInt(numericMatch[1]) : null
  const suffix = numericMatch ? numericMatch[2] : ""
  const { count, ref } = useCountUp(numeric ?? 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-5"
    >
      <p className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
        {numeric !== null ? `${count}${suffix}` : value}
      </p>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-widest font-medium">
        {label}
      </p>
    </motion.div>
  )
}

// ─── Scroll To Top ────────────────────────────────────────────────────────────

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow-lg hover:shadow-xl
            hover:border-[#3b5bdb]/40 dark:hover:border-[#3b5bdb]/40
            text-neutral-500 dark:text-neutral-400 hover:text-[#3b5bdb] dark:hover:text-[#6b8cff]
            transition-all duration-200"
          aria-label="Scroll to top"
        >
          <ChevronUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

function useActiveSection() {
  const [active, setActive] = useState("home")
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.35 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 shadow-sm shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold tracking-tighter bg-gradient-to-br from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent"
          >
            SS.
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              )
            })}
            <div className="ml-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
              <SkyToggle />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-4">
            <SkyToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-600 dark:text-neutral-400"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl pt-24 md:hidden flex flex-col items-center"
          >
            <button onClick={() => setIsOpen(false)} aria-label="Close navigation">
              <MenuVertical menuItems={navItems} color="#3b5bdb" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Section Title ────────────────────────────────────────────────────────────

const SectionTitle = ({ children, num }: { children: React.ReactNode; num?: string }) => (
  <div className="mb-14">
    {num && (
      <p className="font-mono text-[0.68rem] text-[#3b5bdb]/70 tracking-[0.25em] mb-2 uppercase">{num}</p>
    )}
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
      {children}
    </h2>
    <div className="mt-4 h-px w-full bg-gradient-to-r from-[#3b5bdb]/40 via-neutral-200 dark:via-neutral-800 to-transparent" />
  </div>
)

// ─── About ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "17", label: "Years old" },
  { value: "10+", label: "Public projects" },
  { value: "2", label: "CVEs researched" },
  { value: "A-Level", label: "UK student" },
]

const scanLines = [
  { prefix: "[*]", label: "target",    value: "saadsaid158"                          },
  { prefix: "[*]", label: "location",  value: "United Kingdom"                       },
  { prefix: "[*]", label: "age",       value: "17"                                   },
  { prefix: "[+]", label: "role",      value: "security researcher / exploit dev"    },
  { prefix: "[+]", label: "languages", value: "Go (primary)  ·  C  ·  Rust  ·  Bash"},
  { prefix: "[+]", label: "focus",     value: "offensive security · red team · malware research" },
  { prefix: "[+]", label: "tools",     value: "Ghidra · Metasploit · Burp Suite · Wireshark" },
  { prefix: "[+]", label: "status",    value: "open to opportunities"                },
]

const ScanOutput = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let i = 0
        const tick = setInterval(() => {
          i++
          setVisibleCount(i)
          if (i >= scanLines.length) clearInterval(tick)
        }, 90)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 overflow-hidden mb-14 font-mono text-sm"
    >
      {/* bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-neutral-700" />
          <span className="size-2.5 rounded-full bg-neutral-700" />
          <span className="size-2.5 rounded-full bg-neutral-700" />
        </div>
        <span className="text-[0.65rem] text-neutral-500 tracking-widest">profile --target saadsaid158</span>
        <span className="text-[0.65rem] text-neutral-600">zsh</span>
      </div>

      {/* output */}
      <div className="p-5 space-y-1.5">
        <p className="text-neutral-500 text-xs mb-3">
          <span className="text-[#3b5bdb]">❯</span> ./recon.sh --profile saadsaid158
        </p>
        {scanLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={visibleCount > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="flex gap-3 items-baseline"
          >
            <span className={`shrink-0 text-xs font-bold ${line.prefix === "[+]" ? "text-emerald-400" : "text-[#3b5bdb]"}`}>
              {line.prefix}
            </span>
            <span className="text-neutral-500 text-xs w-20 shrink-0">{line.label}</span>
            <span className="text-neutral-200 text-xs">{line.value}</span>
          </motion.div>
        ))}
        {visibleCount >= scanLines.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-400 text-xs pt-2"
          >
            [✓] scan complete
          </motion.p>
        )}
      </div>
    </div>
  )
}

const AboutSection = () => (
  <section id="about" className="py-24 max-w-6xl mx-auto px-6 pt-36">
    <SectionTitle num="// 01.">About</SectionTitle>

    <ScanOutput />

    {/* Stats row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((s, i) => (
        <StatCard key={s.label} value={s.value} label={s.label} i={i} />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="flex justify-center"
    >
      <StarButton
        href="/resume.pdf"
        download
        lightColor="var(--foreground)"
        className="rounded-3xl"
      >
        Download CV
      </StarButton>
    </motion.div>
  </section>
)

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Fusée Gelée PoC",
    desc: "Go-based implementation of CVE-2018-6242 — a coldboot BootROM exploit targeting NVIDIA Tegra X1 chips in Nintendo Switch units. Features TUI, payload management, SHA256 verification, multi-device support, and JSON config. Cross-platform.",
    tags: ["Go", "Exploit Dev", "CVE-2018-6242", "Hardware"],
    url: "https://github.com/SaadSaid158/fusee-gelee-poc",
  },
  {
    title: "C2 Framework",
    desc: "A modular red team command-and-control framework. Cross-platform C implants (Windows + Linux) with a Go teamserver, multi-operator CLI, OTA update system, and a production build pipeline.",
    tags: ["C", "Go", "Red Team", "Malware Dev"],
    url: "https://github.com/SaadSaid158/C2-Framework",
  },
  {
    title: "Passman",
    desc: "Offline-first secret manager using AES-256-GCM and Argon2id for hardened key derivation. Implements fully encrypted vaults for credentials, TOTP secrets, and files with integrity checks and zero network surface.",
    tags: ["Go", "Cryptography", "CLI", "Security"],
    url: "https://github.com/SaadSaid158/Passman",
  },
  {
    title: "Chess Engine",
    desc: "A compact chess engine in Go with bitboard board representation, iterative deepening alpha-beta search, and perft validation. Two front ends: a local browser UI and UCI mode for standard chess GUIs.",
    tags: ["Go", "Algorithms", "UCI", "Chess"],
    url: "https://github.com/SaadSaid158/chess-engine",
  },
]

const ProjectsSection = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
  <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
    <SectionTitle num="// 02.">Projects</SectionTitle>

    {/* Tag filter pills */}
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => setActiveTag(null)}
        className={`px-3 py-1 rounded-full text-xs font-mono font-medium border transition-all duration-200 ${
          !activeTag
            ? "bg-[#3b5bdb] border-[#3b5bdb] text-white"
            : "border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-[#3b5bdb]/50 hover:text-[#3b5bdb]"
        }`}
      >
        All
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          className={`px-3 py-1 rounded-full text-xs font-mono font-medium border transition-all duration-200 ${
            activeTag === tag
              ? "bg-[#3b5bdb] border-[#3b5bdb] text-white"
              : "border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-[#3b5bdb]/50 hover:text-[#3b5bdb]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {filtered.map((proj, idx) => (
        <motion.div
          key={proj.title}
          layout
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: idx * 0.1 }}
          className="group relative flex flex-col h-full rounded-2xl overflow-hidden
            border border-neutral-200/80 dark:border-neutral-800
            bg-white/60 dark:bg-neutral-900/40
            backdrop-blur-sm
            hover:border-[#3b5bdb]/30 dark:hover:border-[#3b5bdb]/20
            hover:shadow-[0_0_32px_rgba(59,91,219,0.08)]
            transition-all duration-300"
        >
          {/* top accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3b5bdb]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {proj.title}
              </h3>
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#3b5bdb] transition-colors ml-2 mt-0.5 shrink-0"
                aria-label={`Open ${proj.title} on GitHub`}
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            <p className="text-neutral-500 dark:text-neutral-400 text-sm flex-grow leading-relaxed mb-5">
              {proj.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {proj.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-2 py-0.5 rounded-md font-mono text-[0.7rem] font-medium border transition-all duration-150 cursor-pointer
                    ${activeTag === tag
                      ? "bg-[#3b5bdb]/10 border-[#3b5bdb]/40 text-[#3b5bdb]"
                      : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700/50 hover:border-[#3b5bdb]/30"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500 hover:text-[#3b5bdb] dark:hover:text-[#6b8cff] transition-colors duration-150 group/link"
            >
              <span>View on GitHub</span>
              <ArrowUpRight className="size-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-150" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────

const radarSkills = [
  { label: "Exploit Dev", value: 80 },
  { label: "Rev Eng", value: 60 },
  { label: "Tool Dev", value: 65 },
  { label: "Privilege Esc", value: 70 },
  { label: "Net Analysis", value: 75 },
  { label: "Malware Res", value: 62 },
]

const techStack = [
  { name: "Go", note: "primary" },
  { name: "C", note: "systems" },
  { name: "Rust", note: "systems" },
  { name: "Bash", note: "automation" },
  { name: "Ghidra", note: "RE" },
  { name: "Wireshark", note: "analysis" },
  { name: "Metasploit", note: "exploitation" },
  { name: "Burp Suite", note: "web sec" },
  { name: "Linux", note: "primary OS" },
]

const SkillsSection = () => (
  <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
    <SectionTitle num="// 03.">Skills</SectionTitle>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Radar chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <HexRadar skills={radarSkills} size={340} />
        <p className="mt-4 text-xs font-mono text-neutral-400 dark:text-neutral-600 tracking-wider">
          // proficiency · hands-on experience
        </p>
      </motion.div>

      {/* Tech stack grid */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <p className="text-sm font-mono text-neutral-500 dark:text-neutral-500 mb-5 tracking-wide">
          // tech stack &amp; tools
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {techStack.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              className="group flex flex-col gap-0.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/40 px-3.5 py-2.5 hover:border-[#3b5bdb]/30 hover:bg-white dark:hover:bg-neutral-900/70 transition-all duration-200"
            >
              <span className="font-mono text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {t.name}
              </span>
              <span className="text-[0.68rem] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
                {t.note}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)

// ─── Contact ──────────────────────────────────────────────────────────────────

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:saad.dev158@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nReply to: " + formData.email)}`
    window.location.href = mailtoLink
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 max-w-2xl mx-auto px-6">
      <SectionTitle num="// 04.">Contact</SectionTitle>
      <p className="text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed">
        Open to collaborations, research projects, and opportunities.
      </p>

      <form
        onSubmit={handleSubmit}
        className="relative space-y-5 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 noise-overlay"
      >
        {/* Name */}
        <div className="float-label-wrap">
          <input
            id="name"
            required
            type="text"
            placeholder=" "
            className="w-full px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-[#3b5bdb]/40 focus:border-[#3b5bdb]/60 outline-none transition-all text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="name">Name</label>
        </div>

        {/* Email */}
        <div className="float-label-wrap">
          <input
            id="email"
            required
            type="email"
            placeholder=" "
            className="w-full px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-[#3b5bdb]/40 focus:border-[#3b5bdb]/60 outline-none transition-all text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <label htmlFor="email">Email</label>
        </div>

        {/* Message */}
        <div className="float-label-wrap">
          <textarea
            id="message"
            required
            rows={5}
            placeholder=" "
            className="w-full px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-[#3b5bdb]/40 focus:border-[#3b5bdb]/60 outline-none transition-all resize-none text-sm"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <label htmlFor="message">Message</label>
        </div>

        <Button type="submit" size="lg" className="w-full text-sm font-semibold tracking-wide">
          {sent ? "Opening mail client…" : "Send Message"}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-neutral-400 dark:text-neutral-600">
        or find me on{" "}
        <a href="https://github.com/SaadSaid158" className="text-neutral-600 dark:text-neutral-400 hover:text-[#3b5bdb] dark:hover:text-[#6b8cff] transition-colors underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700" aria-label="GitHub">
          GitHub
        </a>
        {" "}and{" "}
        <a href="https://tryhackme.com/p/Saad.Said158" className="text-neutral-600 dark:text-neutral-400 hover:text-[#3b5bdb] dark:hover:text-[#6b8cff] transition-colors underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700" aria-label="TryHackMe">
          TryHackMe
        </a>
      </p>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-[#3b5bdb]/20">
      {/*
        SEO content block — visually hidden, fully readable by crawlers.
        This ensures all key text is present in the static HTML served to
        Googlebot before JS hydration.
      */}
      <div className="sr-only" aria-hidden="true">
        <h1>Saad Said (saadsaid158) — Security Researcher &amp; Exploit Developer</h1>
        <p>
          Saad Said, also known as saadsaid158, is a 17-year-old security researcher, exploit developer, and reverse
          engineer based in the UK. Specialising in offensive security, CVE research,
          vulnerability research, and red teaming. Actively seeking opportunities in
          security research and penetration testing.
        </p>
        <h2>About Saad Said</h2>
        <p>
          A-Level student in the UK with 10+ public projects on GitHub. Has researched
          2 CVEs and builds offensive security tools in Go, C, and Rust.
        </p>
        <h2>Projects</h2>
        <ul>
          <li>
            <strong>Fusée Gelée PoC</strong> — Go-based implementation of CVE-2018-6242,
            a coldboot BootROM exploit targeting NVIDIA Tegra X1 chips in Nintendo Switch
            units. Features TUI, payload management, SHA256 verification, multi-device
            support, and JSON config. Cross-platform.
          </li>
          <li>
            <strong>Passman</strong> — Offline-first secret manager using AES-256-GCM
            and Argon2id for hardened key derivation. Implements fully encrypted vaults
            for credentials, TOTP secrets, and files with integrity checks and zero
            network surface.
          </li>
          <li>
            <strong>Chess Engine</strong> — A compact chess engine in Go with bitboard
            board representation, iterative deepening alpha-beta search, and perft
            validation. Two front ends: a local browser UI and UCI mode for standard
            chess GUIs.
          </li>
          <li>
            <strong>C2 Framework</strong> — A modular red team command-and-control
            framework. Cross-platform C implants (Windows + Linux) with a Go teamserver,
            multi-operator CLI, OTA update system, and a production build pipeline.
          </li>
        </ul>
        <h2>Skills &amp; Tools</h2>
        <p>
          Exploit Development, Reverse Engineering, Privilege Escalation, Network Analysis,
          Malware Research, Tool Development, Go, C, Rust, Bash, Ghidra, Wireshark,
          Metasploit, Burp Suite, Linux.
        </p>
        <h2>Contact</h2>
        <p>
          Available for collaborations, security research projects, and opportunities.
          Contact via GitHub at github.com/SaadSaid158 or TryHackMe at
          tryhackme.com/p/Saad.Said158.
        </p>
      </div>

      <Navbar />
      <BackgroundPaths title="Saad Said" />

      {/* gradient section divider */}
      <div className="section-fade-top -mt-12 relative z-10" />

      <AboutSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </div>

      <ProjectsSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </div>

      <SkillsSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </div>

      <ContactSection />
      <FooterSection />
      <ScrollToTop />
    </main>
  )
}
