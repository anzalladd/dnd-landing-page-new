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
        className="text-[14px] leading-[22px] tracking-[0.002em] font-normal text-foreground whitespace-nowrap z-10"
      >
        {label}
      </span>

      {title && description && (
        <div 
          ref={cardRef} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] rounded-[24px] p-6 opacity-0 scale-75 pointer-events-none shadow-xl z-20 flex flex-col items-start text-left"
          style={{ backgroundColor: bgHex, color: textHex }}
        >
          <h3 className="font-serif text-[24px] mb-3 leading-tight">{title}</h3>
          <p className="font-sans text-[14px] leading-[1.4] opacity-90">{description}</p>
        </div>
      )}
    </div>
  );
}
