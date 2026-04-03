"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"

import SkyToggle from "@/components/ui/sky-toggle"
import { MenuVertical } from "@/components/ui/menu-vertical"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { StarButton } from "@/components/ui/star-button"
import FooterSection from "@/components/ui/footer"
import { HexRadar } from "@/components/ui/hex-radar"

// ─── Navbar ──────────────────────────────────────────────────────────────────

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-14">
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

const AboutSection = () => (
  <section id="about" className="py-24 max-w-6xl mx-auto px-6 pt-36">
    <SectionTitle>About</SectionTitle>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[1.05rem] leading-[1.8] text-neutral-600 dark:text-neutral-300 mb-14">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        I&apos;m Saad, a 17-year-old security researcher and A Level student based in
        the UK. Passionate about low-level systems, offensive security, and building
        tools that push the boundaries of what&apos;s possible.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.12 }}
      >
        I specialise in exploit development, reverse engineering, and malware
        research — primarily in Go, C, and Python. Actively seeking to contribute to
        the security community and explore opportunities in red teaming and
        vulnerability research.
      </motion.p>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-5"
        >
          <p className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            {s.value}
          </p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-widest font-medium">
            {s.label}
          </p>
        </motion.div>
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
    title: "Chess Engine",
    desc: "A compact chess engine in Go with bitboard board representation, iterative deepening alpha-beta search, and perft validation. Two front ends: a local browser UI and UCI mode for standard chess GUIs.",
    tags: ["Go", "Algorithms", "UCI", "Chess"],
    url: "https://github.com/SaadSaid158/chess-engine",
  },
  {
    title: "Fusée Web Injector",
    desc: "Browser-based payload injector for Fusée Gelée using the WebUSB API — no native drivers or installs required. Runs entirely client-side, in-browser.",
    tags: ["JavaScript", "WebUSB", "Exploit", "Browser"],
    url: "https://github.com/SaadSaid158/fusee-web-injector",
  },
]

const ProjectsSection = () => (
  <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
    <SectionTitle>Projects</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((proj, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 24 }}
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

            <p className="text-neutral-500 dark:text-neutral-400 text-sm flex-grow leading-relaxed mb-6">
              {proj.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md font-mono text-[0.7rem] font-medium
                    bg-neutral-100 dark:bg-neutral-800/80
                    text-neutral-600 dark:text-neutral-400
                    border border-neutral-200 dark:border-neutral-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
)

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
    <SectionTitle>Skills</SectionTitle>

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
      <SectionTitle>Contact</SectionTitle>
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
    </main>
  )
}
