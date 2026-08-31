"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Dot {
  x: number;
  y: number;
  color: string;
}

export const BirdScatter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    fetch("/bird-dots.json")
      .then((res) => res.json())
      .then((data) => setDots(data))
      .catch((err) => console.error("Failed to load bird-dots.json", err));
  }, []);

  useEffect(() => {
    if (!dots.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // The bounds where the bird is drawn
    const width = 334;
    const height = 271;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Create particles
    const particles = dots.map((dot) => ({
      tx: dot.x * width,
      ty: dot.y * height,
      // Start them scattered from random directions
      cx: (Math.random() - 0.5) * width * 3 + width / 2,
      cy: (Math.random() - 0.5) * height * 3 + height / 2,
      color: dot.color,
      alpha: 0,
    }));
    
    particlesRef.current = particles;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        // Drawing a 2x2 dot
        ctx.fillRect(p.cx, p.cy, 2, 2);
      });
      ctx.globalAlpha = 1.0;
    };

    gsap.ticker.add(render);

    // Animate assembling the bird
    gsap.to(particles, {
      duration: 2,
      cx: (i, t) => t.tx,
      cy: (i, t) => t.ty,
      alpha: 1,
      stagger: {
        amount: 1.5,
        from: "random"
      },
      ease: "power3.out",
    });

    return () => {
      gsap.ticker.remove(render);
    };
  }, [dots]);

  const handleMouseEnter = () => {
    if (!particlesRef.current.length) return;
    
    // Scatter slightly on hover
    gsap.to(particlesRef.current, {
      duration: 0.5,
      cx: (i, t) => t.tx + (Math.random() - 0.5) * 20,
      cy: (i, t) => t.ty + (Math.random() - 0.5) * 20,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    if (!particlesRef.current.length) return;
    
    // Return to original position
    gsap.to(particlesRef.current, {
      duration: 0.8,
      cx: (i, t) => t.tx,
      cy: (i, t) => t.ty,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div 
      className="absolute top-[100px] left-4 w-[334px] h-[271px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
