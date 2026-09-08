"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { RevealText } from "@/components/motion/RevealText";

/**
 * ACT 2 — the thesis. One pinned statement whose subject scrambles between the
 * two halves of the studio's job. Strategy and implementation are the same
 * sentence, so they occupy the same words rather than two sections.
 */
const SWAP = ["STRATEGY", "IMPLEMENTATION", "THE BRAND", "THE BUILD"];

export function ActManifesto() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "+=260%",
        scrub: 0.8,
        pin: ".manifesto-stage",
        invalidateOnRefresh: true,
      },
    });

    SWAP.forEach((word, index) => {
      if (index === 0) return;
      timeline.to(
        ".manifesto-swap",
        {
          scrambleText: { text: word, chars: "upperCase", speed: 0.5, revealDelay: 0.15 },
          duration: 1,
        },
        index - 1
      );
    });

    // Counter-drift on the rules gives the pinned frame something to measure
    // the scroll against, so it does not read as a frozen page.
    timeline.fromTo(
      ".manifesto-rule",
      { scaleX: 0 },
      { scaleX: 1, ease: "none", duration: SWAP.length - 1 },
      0
    );

    return () => timeline.kill();
  }, { scope: root });

  return (
    <section ref={root} className="relative bg-ink">
      <div className="manifesto-stage relative flex flex-col justify-center px-6 md:px-12 h-dvh overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex items-center gap-4 mb-14">
            <span className="font-medium text-brand-green text-[11px] tracking-[0.3em]">02</span>
            <span className="manifesto-rule flex-1 bg-gray-100/20 h-px origin-left" />
            <span className="font-medium text-gray-100/45 text-[11px] tracking-[0.3em]">
              HOW WE WORK
            </span>
          </div>

          <p className="font-signifier text-gray-100 text-[8vw] md:text-[5.5vw] leading-[0.95] tracking-tight">
            In most projects,
            <br />
            it all comes down to{" "}
            <span className="manifesto-swap inline-block font-sans font-medium text-brand-green text-[6vw] md:text-[4vw] tracking-tight">
              STRATEGY
            </span>
          </p>

          <RevealText className="mt-14 max-w-[52ch] text-gray-100/55 text-base md:text-lg leading-relaxed">
            We work with organizations to determine how the brand should be perceived.
            And then we put that into practice — the same team, the same room, from the
            first sketch to the last deploy.
          </RevealText>
        </div>
      </div>
    </section>
  );
}
