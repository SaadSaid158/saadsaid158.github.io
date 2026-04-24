"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Static durations — avoids Math.random() hydration mismatch
const PATH_DURATIONS = Array.from({ length: 36 }, (_, i) => 20 + (i % 8) * 1.8)

// ─── Cycling Role Badge ───────────────────────────────────────────────────────
const ROLES = [
  "Security Researcher",
  "Exploit Developer",
  "Reverse Engineer",
  "Red Teamer",
  "Tool Builder",
]

function CyclingRole() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % ROLES.length)
        setVisible(true)
      }, 350)
    }, 2200)
    return () => clearInterval(cycle)
  }, [])

  return (
    <span
      style={{ transition: "opacity 0.35s ease", opacity: visible ? 1 : 0 }}
      className="inline-block"
    >
      {ROLES[idx]}
    </span>
  )
}

function FloatingPaths({ position, reduced }: { position: number; reduced: boolean }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0 }}
                    animate={reduced ? { opacity: 0.15 } : {
                            pathOffset: [0, 1, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: PATH_DURATIONS[path.id],
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");
    const reduced = !!useReducedMotion();

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 pb-20" id="home">
            <div className="absolute inset-0">
                <FloatingPaths position={1} reduced={reduced} />
                <FloatingPaths position={-1} reduced={reduced} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="font-mono text-xs md:text-sm tracking-[0.22em] text-neutral-600 dark:text-neutral-400 mb-10 uppercase px-5 py-2.5 rounded-full bg-white/60 dark:bg-neutral-950/60 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50"
                    >
                        <CyclingRole />&nbsp;&nbsp;·&nbsp;&nbsp;Go / C / Rust
                    </motion.p>

                    <div
                        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Button
                            asChild
                            variant="ghost"
                            className="rounded-[1.15rem] px-8 py-6 text-sm font-mono font-semibold tracking-widest uppercase backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50"
                        >
                            <a href="#projects">
                                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                    View Work
                                </span>
                                <span
                                    className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                    transition-all duration-300"
                                >
                                    →
                                </span>
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>

            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-600 px-4 py-2"
            >
                scroll ↓
            </motion.div>
        </div>
    );
}
