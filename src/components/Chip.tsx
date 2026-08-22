"use client";

import { useRef } from "react";
import gsap from "gsap";

interface ChipProps {
  label: string;
  className?: string;
  title?: string;
  description?: string;
  bgHex?: string;
  textHex?: string;
}

export function Chip({ label, className = "", title, description, bgHex = "#B5E96A", textHex = "#121212" }: ChipProps) {
  const chipRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.killTweensOf([chipRef.current, cardRef.current, labelRef.current]);

    // Slight bump on the container
    gsap.to(chipRef.current, { zIndex: 50, duration: 0 });

    if (title && description) {
      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.2)",
      });
      gsap.to(labelRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    } else {
      gsap.to(chipRef.current, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf([chipRef.current, cardRef.current, labelRef.current]);

    gsap.to(chipRef.current, { zIndex: 1, duration: 0 });

    if (title && description) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(labelRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
      });
    } else {
      gsap.to(chipRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={chipRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute px-3 py-2 rounded-full cursor-pointer flex items-center justify-center transition-colors hover:bg-transparent ${className}`}
    >
      <span
        ref={labelRef}
        className="z-10 font-normal text-[14px] text-foreground leading-[22px] tracking-[0.002em] whitespace-nowrap pointer-events-none"
      >
        {label}
      </span>

      {title && description && (
        <div
          ref={cardRef}
          className="top-1/2 left-1/2 z-20 absolute flex flex-col items-start opacity-0 shadow-xl p-6 rounded-[24px] w-[280px] text-left scale-75 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: bgHex, color: textHex }}
        >
          <h3 className="mb-3 font-serif text-[24px] leading-tight">{title}</h3>
          <p className="opacity-90 font-sans text-[14px] leading-[1.4]">{description}</p>
        </div>
      )}
    </div>
  );
}
