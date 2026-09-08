"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Registered once, from a single module. Registering per-component means every
// file has to guard for SSR, and a missed guard only shows up as a plugin that
// silently does nothing.
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Flip,
    Observer,
    ScrambleTextPlugin
  );
}

/** The house easing. Slow out of the gate, long confident settle. */
export const EASE = "power3.inOut";
export const EASE_OUT = "expo.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer };
