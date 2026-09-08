"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ParticleBird, createBirdDrive, type BirdDrive } from "@/components/ui/ParticleBird";

/**
 * ACT 1 — the bird assembles out of dust as you scroll, then bursts apart and
 * hands the page to the manifesto. The studio's mark is the first thing that
 * happens, and it happens because the visitor scrolled: the site starts as
 * scattered material and only becomes something once you engage with it.
 */
export function ActHero({ started }: { started: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  // A ref, not state: GSAP mutates this object every frame and no render should
  // ever depend on it. createBirdDrive() re-runs per render but the value is
  // discarded after the first - it is three numbers.
  const driveRef = useRef<BirdDrive>(createBirdDrive());

  useGSAP(() => {
    if (!started) return;

    if (prefersReducedMotion()) {
      driveRef.current.assemble = 1;
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: ".hero-stage",
        pinSpacing: false,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(driveRef.current, { assemble: 1, ease: "none", duration: 1.6 })
      .to(".hero-headline", { opacity: 1, duration: 0.3 }, 0.9)
      .to(".hero-scroll-hint", { opacity: 0, duration: 0.2 }, 0.1)
      // The burst overlaps the headline leaving, so the bird scatters into the
      // next act rather than dissolving on its own beat.
      .to(driveRef.current, { burst: 1, ease: "power2.in", duration: 0.8 }, 1.7)
      .to(".hero-headline", { opacity: 0, yPercent: -30, duration: 0.6 }, 1.8);

    // Idle breath, independent of scroll position.
    const breath = gsap.to(driveRef.current, {
      jitter: 1.6,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      timeline.kill();
      breath.kill();
    };
  }, { scope: root, dependencies: [started] });

  return (
    <section ref={root} className="relative h-[320dvh]">
      <div className="hero-stage relative flex flex-col justify-center items-center bg-ink w-full h-dvh overflow-hidden">
        <ParticleBird driveRef={driveRef} className="absolute inset-0 w-full h-full" dotSize={2} />

        <div className="hero-headline z-10 relative opacity-0 px-6 text-center pointer-events-none">
          <p className="mb-5 font-medium text-brand-green text-[11px] tracking-[0.3em]">
            DESIGN &amp; DEVELOPMENT ASSOCIATE
          </p>
          <h1 className="mx-auto max-w-[16ch] font-signifier text-gray-100 text-[9vw] md:text-[6.5vw] leading-[0.9] tracking-tight">
            We build the parts people remember.
          </h1>
        </div>

        <div className="hero-scroll-hint bottom-10 absolute flex flex-col items-center gap-3">
          <span className="font-medium text-gray-100/45 text-[10px] tracking-[0.25em]">
            SCROLL TO BEGIN
          </span>
          <span className="relative bg-gray-100/15 w-px h-12 overflow-hidden">
            <span className="top-0 left-0 absolute bg-brand-green w-px h-4 animate-[scroll-hint_1.8s_ease-in-out_infinite]" />
          </span>
        </div>
      </div>

    </section>
  );
}
