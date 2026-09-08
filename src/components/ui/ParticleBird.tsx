"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface Dot {
  x: number;
  y: number;
  color: string;
}

interface Particle {
  /** Assembled position, normalised 0..1 within the canvas box. */
  tx: number;
  ty: number;
  /** Where this particle waits before the bird forms. */
  sx: number;
  sy: number;
  /** Unit vector used when the bird bursts apart. */
  bx: number;
  by: number;
  /** 0..STAGGER_SPAN — offsets this particle's arrival within the assemble. */
  lag: number;
  color: string;
}

/**
 * Mutable state the parent animates with GSAP. Passing this instead of props
 * keeps the scroll scrub off React's render path entirely — 4,886 particles
 * repositioned per frame, zero re-renders.
 */
export type BirdDrive = {
  /** 0 = scattered dust, 1 = bird fully formed. */
  assemble: number;
  /** 0 = intact, 1 = blown outward past the viewport. */
  burst: number;
  /** Extra wander, used for the idle breath and pointer push. */
  jitter: number;
};

export function createBirdDrive(): BirdDrive {
  return { assemble: 0, burst: 0, jitter: 0 };
}

const STAGGER_SPAN = 0.55;

export function ParticleBird({
  driveRef,
  className = "",
  dotSize = 2,
  pointerReactive = true,
}: {
  /** The ref itself, not its value - reading .current during render is a
   *  React violation and the ticker needs the live object anyway. */
  driveRef: React.RefObject<BirdDrive>;
  className?: string;
  dotSize?: number;
  pointerReactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    let cancelled = false;
    fetch("/bird-dots.json")
      .then((res) => res.json())
      .then((data: Dot[]) => {
        if (!cancelled) setDots(data);
      })
      .catch((err) => console.error("Failed to load bird-dots.json", err));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const drive = driveRef.current;
    if (!dots.length || !canvas || !host || !drive) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Positions are normalised, so a resize only needs new canvas dimensions —
    // the particle set itself survives untouched.
    const build = () => {
      particles = dots.map((dot) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.6 + Math.random() * 1.1;
        return {
          tx: dot.x,
          ty: dot.y,
          sx: 0.5 + Math.cos(angle) * radius,
          sy: 0.5 + Math.sin(angle) * radius * 0.75,
          bx: Math.cos(angle),
          by: Math.sin(angle),
          lag: Math.random() * STAGGER_SPAN,
          color: dot.color,
        };
      });
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    build();
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    // The bird artwork is 334x271; preserve that aspect inside whatever box we
    // are given, letterboxed and centred, so it never stretches.
    const ASPECT = 334 / 271;

    const render = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      let drawW = width;
      let drawH = width / ASPECT;
      if (drawH > height) {
        drawH = height;
        drawW = height * ASPECT;
      }
      const offX = (width - drawW) / 2;
      const offY = (height - drawH) / 2;

      const { assemble, burst, jitter } = drive;
      const burstPush = burst * Math.max(width, height) * 1.2;
      const time = performance.now() * 0.0006;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Each particle runs the same 0..1 curve, offset by its lag, so the
        // bird knits together from scattered dust instead of snapping in.
        let t = (assemble - p.lag) / (1 - STAGGER_SPAN);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const eased = 1 - Math.pow(1 - t, 3);

        const nx = p.sx + (p.tx - p.sx) * eased;
        const ny = p.sy + (p.ty - p.sy) * eased;

        let x = offX + nx * drawW;
        let y = offY + ny * drawH;

        if (jitter) {
          x += Math.sin(time + i) * jitter;
          y += Math.cos(time * 1.3 + i) * jitter;
        }

        if (burst) {
          x += p.bx * burstPush;
          y += p.by * burstPush;
        }

        if (pointerReactive) {
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const distSq = dx * dx + dy * dy;
          // Only particles inside a ~110px radius are displaced.
          if (distSq < 12100 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 110) * 42;
            x += (dx / dist) * force;
            y += (dy / dist) * force;
          }
        }

        ctx.globalAlpha = eased * (1 - burst);
        ctx.fillStyle = p.color;
        ctx.fillRect(x, y, dotSize, dotSize);
      }

      ctx.globalAlpha = 1;
    };

    gsap.ticker.add(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
    };
    if (pointerReactive) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      gsap.ticker.remove(render);
      observer.disconnect();
      if (pointerReactive) window.removeEventListener("pointermove", onPointerMove);
    };
  }, [dots, driveRef, dotSize, pointerReactive]);

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
