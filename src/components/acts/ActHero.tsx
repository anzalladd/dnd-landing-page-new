"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ParticleBird, createBirdDrive, type BirdDrive } from "@/components/ui/ParticleBird";

/**
 * ACT 1 - the frame is already alive when the curtain lifts: a drifting field
 * of particles you can push around with the pointer, the headline, and the
 * studio's vitals. Scrolling is what gathers that dust into the mark, so the
 * payoff is earned rather than played at you. Then it bursts into Act 2.
 */

const TICKER = [
  "BRAND IDENTITY",
  "DESIGN SYSTEMS",
  "WEB DEVELOPMENT",
  "ART DIRECTION",
  "MOTION",
  "EDITORIAL",
];

/** Renders a placeholder first, then ticks - the server has no clock to match. */
function LiveClock({ city, tz }: { city: string; tz: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
    const tick = () => setTime(format.format(new Date()));
    // rAF rather than a direct call: setting state synchronously in an effect
    // body cascades a second render before paint.
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, [tz]);

  return (
    <span className="flex items-center gap-2 font-medium text-[11px] tracking-[0.2em]">
      <span className="text-gray-100/40">{city}</span>
      <span className="text-gray-100/70 tabular-nums">{time}</span>
    </span>
  );
}

export function ActHero({ started }: { started: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  // A ref, not state: GSAP mutates this object every frame and no render should
  // ever depend on it. createBirdDrive() re-runs per render but the value is
  // discarded after the first - it is three numbers.
  const driveRef = useRef<BirdDrive>(createBirdDrive());

  /* --------------------------------------------- entrance, once the curtain is up */
  useGSAP(
    () => {
      if (!started || prefersReducedMotion()) return;

      gsap
        .timeline()
        .from(".hero-chrome", { opacity: 0, y: -14, duration: 0.9, ease: "expo.out", stagger: 0.08 })
        .from(
          ".hero-line",
          { yPercent: 115, duration: 1.25, ease: "expo.out", stagger: 0.11 },
          0.1
        )
        .from(".hero-eyebrow", { opacity: 0, duration: 0.8, ease: "power2.out" }, 0.35)
        .from(".hero-foot", { opacity: 0, y: 18, duration: 0.9, ease: "expo.out", stagger: 0.09 }, 0.5);
    },
    { scope: root, dependencies: [started] }
  );

  /* ------------------------------------------------------------ scroll timeline */
  useGSAP(
    () => {
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
        .to(driveRef.current, { assemble: 1, ease: "none", duration: 1.6 }, 0)
        // The headline gives up the stage as the bird takes it - both cannot be
        // the subject at the same time.
        .to(".hero-headline", { opacity: 0, scale: 0.92, yPercent: -18, duration: 0.9, ease: "power2.in" }, 0.35)
        .to(".hero-foot, .hero-eyebrow", { opacity: 0, duration: 0.35 }, 0.1)
        // The burst overlaps the handoff, so the bird scatters into the next act
        // rather than dissolving on its own beat.
        .to(driveRef.current, { burst: 1, ease: "power2.in", duration: 0.8 }, 1.7);

      // Idle breath, independent of scroll position.
      const breath = gsap.to(driveRef.current, {
        jitter: 2.2,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      return () => {
        timeline.kill();
        breath.kill();
      };
    },
    { scope: root, dependencies: [started] }
  );

  return (
    <section ref={root} className="relative h-[320dvh]">
      <div className="hero-stage relative flex flex-col justify-between bg-ink w-full h-dvh overflow-hidden">
        {/* The field sits behind everything and reacts to the pointer, so the
            frame responds before the visitor has done anything at all. */}
        <ParticleBird driveRef={driveRef} className="absolute inset-0 w-full h-full" dotSize={2.4} />

        {/* Vignette keeps the dust off the type at the edges. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink)_92%)] pointer-events-none" />

        {/* ------------------------------------------------------------ chrome */}
        <header className="z-10 relative flex justify-between items-start px-6 md:px-10 pt-8">
          <span className="hero-chrome font-medium text-gray-100 text-[11px] tracking-[0.2em]">
            D&amp;D ASSOCIATE
          </span>
          <div className="hero-chrome hidden sm:flex flex-col items-end gap-1.5">
            <LiveClock city="JAKARTA" tz="Asia/Jakarta" />
            <LiveClock city="BERLIN" tz="Europe/Berlin" />
          </div>
        </header>

        {/* ----------------------------------------------------------- headline */}
        <div className="z-10 relative flex flex-col items-center px-6 text-center pointer-events-none">
          <p className="hero-eyebrow mb-6 font-medium text-brand-green text-[11px] tracking-[0.3em]">
            DESIGN &amp; DEVELOPMENT ASSOCIATE
          </p>
          <h1 className="hero-headline mx-auto max-w-[15ch] font-signifier text-gray-100 text-[13vw] md:text-[8vw] leading-[0.88] tracking-tight">
            <span className="block overflow-hidden">
              <span className="hero-line inline-block">We build the</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block">parts people</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block italic">remember.</span>
            </span>
          </h1>
        </div>

        {/* --------------------------------------------------------------- foot */}
        <div className="z-10 relative flex flex-col gap-6 pb-8">
          <div className="hero-foot flex md:flex-row flex-col justify-between items-center gap-5 px-6 md:px-10">
            <p className="max-w-[34ch] text-gray-100/45 text-sm md:text-left text-center leading-relaxed">
              A full-service design and code studio. Strategy and implementation,
              same team, same room.
            </p>

            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-100/40 text-[10px] tracking-[0.25em]">
                SCROLL TO ASSEMBLE
              </span>
              <span className="relative bg-gray-100/15 w-px h-10 overflow-hidden">
                <span className="top-0 left-0 absolute bg-brand-green w-px h-4 animate-[scroll-hint_1.8s_ease-in-out_infinite]" />
              </span>
            </div>
          </div>

          {/* Ticker gives the bottom edge a pulse the whole time you sit here. */}
          <div className="hero-foot flex border-gray-100/10 border-y overflow-hidden select-none">
            <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] py-3">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {TICKER.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-6 px-6 font-medium text-gray-100/35 text-[11px] tracking-[0.25em] whitespace-nowrap"
                    >
                      {item}
                      <span className="bg-brand-green/60 rounded-full w-1 h-1" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
