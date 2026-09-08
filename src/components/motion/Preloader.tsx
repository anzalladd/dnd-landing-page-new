"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Holds the first paint until the heavy hero assets are decoded, so Act 1 never
 * plays against empty boxes. The counter is tied to real load progress rather
 * than a fixed timer, then eased to 100 so it can't stall at 97.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    const finish = () => {
      setGone(true);
      onDone();
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const progress = { value: 0 };
    const timeline = gsap.timeline();

    timeline
      .to(progress, {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate() {
          if (counter.current) {
            counter.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
          }
        },
      })
      .to(".preloader-line", { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, 0)
      .to(".preloader-word", {
        yPercent: -110,
        duration: 0.9,
        ease: "expo.inOut",
        stagger: 0.06,
      })
      // Curtain lifts from the bottom edge, revealing the hero already in place.
      .to(
        root.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.25,
          ease: "expo.inOut",
          onComplete: finish,
        },
        "-=0.45"
      );

    return () => timeline.kill();
  }, { scope: root });

  if (gone) return null;

  return (
    <div
      ref={root}
      className="z-[95] fixed inset-0 flex flex-col justify-between bg-ink p-6 md:p-10"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex justify-between items-start overflow-hidden">
        <span className="preloader-word inline-block font-medium text-gray-100 text-xs tracking-[0.2em]">
          D&amp;D ASSOCIATE
        </span>
        <span className="preloader-word inline-block font-medium text-gray-100/50 text-xs tracking-[0.2em]">
          JAKARTA / BERLIN
        </span>
      </div>

      <div className="overflow-hidden">
        <p className="preloader-word font-signifier text-gray-100 text-[13vw] md:text-[9vw] leading-[0.85] tracking-tight">
          Strategy,
          <br />
          then practice.
        </p>
      </div>

      <div className="flex items-end gap-6">
        <div className="flex-1 bg-gray-100/15 h-px overflow-hidden">
          <div className="preloader-line bg-brand-green h-px origin-left scale-x-0" />
        </div>
        <span
          ref={counter}
          className="font-medium text-gray-100 text-sm tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
