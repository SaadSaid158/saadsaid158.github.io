"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Skill {
  label: string;
  value: number; // 0–100
}

interface HexRadarProps {
  skills: Skill[];
  size?: number;
}

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function HexRadar({ skills, size: sizeProp }: HexRadarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(sizeProp ?? 340);
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36;
  const n = skills.length;
  const rings = [0.25, 0.5, 0.75, 1];
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  // Auto-size based on container width (responsive on mobile)
  useEffect(() => {
    if (sizeProp) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setSize(Math.min(340, Math.max(200, w - 48)));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [sizeProp]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // hex grid lines (rings)
  const ringPolygons = rings.map((frac) =>
    skills
      .map((_, i) => {
        const angle = (360 / n) * i;
        const p = polarToCart(cx, cy, maxR * frac, angle);
        return `${p.x},${p.y}`;
      })
      .join(" ")
  );

  // spokes
  const spokeLines = skills.map((_, i) => {
    const angle = (360 / n) * i;
    const outer = polarToCart(cx, cy, maxR, angle);
    return { x1: cx, y1: cy, x2: outer.x, y2: outer.y };
  });

  // data polygon (animated)
  const dataPoints = skills.map((s, i) => {
    const angle = (360 / n) * i;
    return polarToCart(cx, cy, maxR * (s.value / 100), angle);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // collapsed polygon (for animation start)
  const collapsedPolygon = skills
    .map((_, i) => {
      const angle = (360 / n) * i;
      const p = polarToCart(cx, cy, 0, angle);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  // label positions (slightly outside the outermost ring)
  const labelOffset = maxR + 28;
  const labels = skills.map((s, i) => {
    const angle = (360 / n) * i;
    const p = polarToCart(cx, cy, labelOffset, angle);
    // text-anchor based on position
    let anchor: "middle" | "start" | "end" = "middle";
    const normAngle = ((angle % 360) + 360) % 360;
    if (normAngle > 10 && normAngle < 170) anchor = "start";
    else if (normAngle > 190 && normAngle < 350) anchor = "end";
    return { ...p, label: s.label, anchor };
  });

  return (
    <div ref={containerRef} className="w-full flex justify-center">
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="overflow-visible"
    >
      {/* grid rings */}
      {ringPolygons.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-neutral-300 dark:text-neutral-700"
        />
      ))}

      {/* spokes */}
      {spokeLines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-neutral-300 dark:text-neutral-700"
        />
      ))}

      {/* data fill */}
      <motion.polygon
        points={inView ? dataPolygon : collapsedPolygon}
        animate={{ points: inView ? dataPolygon : collapsedPolygon }}
        initial={{ points: collapsedPolygon }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        fill="rgba(59,91,219,0.12)"
        stroke="#3b5bdb"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(59,91,219,0.35)]"
      />

      {/* data vertex dots */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3.5}
          fill="#3b5bdb"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: 1.1 + i * 0.04 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          className="drop-shadow-[0_0_6px_rgba(59,91,219,0.7)]"
        />
      ))}

      {/* labels */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor={l.anchor}
          dominantBaseline="middle"
          fontSize="11.5"
          fontFamily="var(--font-geist-mono, ui-monospace)"
          fontWeight="500"
          className="fill-neutral-600 dark:fill-neutral-400 tracking-tight"
        >
          {l.label}
        </text>
      ))}

      {/* value labels inside dots */}
      {dataPoints.map((p, i) => (
        <motion.text
          key={`val-${i}`}
          x={p.x}
          y={p.y - 9}
          textAnchor="middle"
          fontSize="8"
          fontFamily="var(--font-geist-mono, ui-monospace)"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3 + i * 0.04 }}
          className="fill-[#3b5bdb]"
        >
          {skills[i].value}
        </motion.text>
      ))}
    </svg>
    </div>
  );
}
