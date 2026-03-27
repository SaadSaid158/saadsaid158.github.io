"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

import SkyToggle from "@/components/ui/sky-toggle"
import { MenuVertical } from "@/components/ui/menu-vertical"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { StarButton } from "@/components/ui/star-button"
import FooterSection from "@/components/ui/footer"

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold tracking-tighter">
            SS.
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="ml-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
              <SkyToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-neutral-950 pt-24 md:hidden flex flex-col items-center">
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <MenuVertical menuItems={navItems} color="#00e1ff" />
          </button>
        </div>
      )}
    </>
  )
}

// Section Title Component
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-4xl font-bold tracking-tight mb-2">{children}</h2>
    <div className="h-1 w-16 bg-cyan-500 rounded-full"></div>
  </div>
)

// About Section
const AboutSection = () => (
  <section id="about" className="py-24 max-w-6xl mx-auto px-6 pt-32">
    <SectionTitle>About Me</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-4">
          I'm Saad, a 17-year-old security researcher and A Level student based in the UK. I'm passionate about low-level systems, offensive security, and building tools that push the boundaries of what's possible.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>
          I specialise in exploit development, reverse engineering, and malware research — primarily in Go, C, and Python. I'm actively looking to contribute to the security community and explore opportunities in red teaming and vulnerability research.
        </p>
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-10 flex justify-center"
    >
      <StarButton
        href="/resume.pdf"
        download
        lightColor="var(--foreground)"
        className="rounded-3xl cursor-pointer"
      >
        Download CV
      </StarButton>
    </motion.div>
  </section>
)

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: "Fusée Gelée PoC",
      desc: "A Go-based implementation of CVE-2018-6242 — a coldboot BootROM exploit targeting NVIDIA Tegra X1 chips in Nintendo Switch units manufactured before mid-2018. Features a TUI interface, payload management, auto-download, SHA256 verification, multi-device support, and a JSON config/favourites system. Cross-platform: Linux, Windows, macOS (amd64 + arm64).",
      tags: ["Go", "Exploit Dev", "CVE-2018-6242", "Hardware"],
      url: "https://github.com/SaadSaid158/fusee-gelee-poc"
    },
    {
      title: "Chess Engine",
      desc: "A compact chess engine written in Go with a bitboard-based board representation, iterative deepening alpha-beta search, and built-in perft validation. Supports two front ends: a local browser UI and UCI mode for standard chess GUIs.",
      tags: ["Go", "Algorithms", "UCI", "Chess"],
      url: "https://github.com/SaadSaid158/chess-engine"
    },
    {
      title: "Fusée Web Injector",
      desc: "A browser-based payload injector for the Fusée Gelée exploit using the WebUSB API — no native drivers or installs required. Runs entirely client-side.",
      tags: ["JavaScript", "WebUSB", "Exploit", "Browser"],
      url: "https://github.com/SaadSaid158/fusee-web-injector"
    }
  ]

  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6 bg-neutral-50 dark:bg-neutral-900/20 rounded-3xl">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col h-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm flex-grow mb-6 leading-relaxed">
              {proj.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {proj.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-cyan-100 dark:bg-blue-900/30 text-cyan-800 dark:text-cyan-300 text-xs font-medium rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full">
              <a href={proj.url} target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Skills Section
const SkillsSection = () => {
  const skills = [
    { name: "Offensive Security & Exploit Development", level: 80 },
    { name: "Low-Level Systems & Reverse Engineering", level: 60 },
    { name: "Security Tool Development & Automation", level: 65 },
    { name: "Network Analysis & Attack Path Mapping", level: 75 },
    { name: "Post-Exploitation & Privilege Escalation", level: 70 },
  ]

  return (
    <section id="skills" className="py-24 max-w-4xl mx-auto px-6">
      <SectionTitle>Skills & Expertise</SectionTitle>
      <p className="text-neutral-600 dark:text-neutral-400 mb-10">Proficiency levels based on hands-on experience</p>
      
      <div className="space-y-8 mb-16">
        {skills.map((skill, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-neutral-800 dark:text-neutral-200">{skill.name}</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">{skill.level}%</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-[#00e1ff] dark:to-[#0077ff] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with actual email
    const mailtoLink = `mailto:saad.dev158@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nReply to: " + formData.email)}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="py-24 max-w-3xl mx-auto px-6">
      <SectionTitle>Contact Me</SectionTitle>
      <p className="text-neutral-600 dark:text-neutral-400 mb-10 text-lg">
        Open to collaborations, research projects, and opportunities.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-50 dark:bg-neutral-900/30 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Name</label>
          <input
            id="name"
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Email</label>
          <input
            id="email"
            required
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Message</label>
          <textarea
            id="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>
        <Button type="submit" size="lg" className="w-full text-base font-semibold">
          Send Message
        </Button>
      </form>
      <p className="text-center mt-6 text-sm text-neutral-500">
        Alternatively, reach me directly on <a href="https://github.com/SaadSaid158" className="text-cyan-500 hover:underline" aria-label="Visit my GitHub">GitHub</a> or <a href="https://tryhackme.com/p/Saad.Said158" className="text-cyan-500 hover:underline" aria-label="View my TryHackMe profile">TryHackMe</a>.
      </p>
    </section>
  )
}


export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-cyan-500/30">
      <Navbar />
      <BackgroundPaths title="Saad Said" />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
