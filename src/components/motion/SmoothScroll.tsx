"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * ScrollSmoother needs exactly this wrapper/content pair, and it transforms
 * #smooth-content. Anything that must be viewport-fixed (cursor, preloader, the
 * expanded card overlay) has to live OUTSIDE this component, or the transform
 * becomes its containing block and `fixed` silently turns into `absolute`.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: "#smooth-content",
      smooth: 1.35,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => smoother.kill();
  }, { scope: wrapper });

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}

/** Freezes the page behind a fullscreen overlay without losing scroll position. */
export function setSmootherPaused(paused: boolean) {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.paused(paused);
    // normalizeScroll swallows wheel/touch at the document level, which would
    // starve the expanded card's own inner scroller. It has to come off for as
    // long as the overlay owns the scrolling.
    ScrollTrigger.normalizeScroll(!paused);
  } else {
    // No smoother (reduced motion): fall back to locking the document.
    gsap.set(document.documentElement, { overflow: paused ? "hidden" : "" });
  }
}
