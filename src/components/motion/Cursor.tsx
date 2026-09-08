"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Elements opt in with data-cursor="open" | "drag" | "link" | "hide".
 * Read from the event target's closest match so nested children inherit it.
 */
type CursorState = "default" | "open" | "drag" | "link" | "hide";

const LABELS: Record<CursorState, string> = {
  default: "",
  open: "OPEN",
  drag: "DRAG",
  link: "VISIT",
  hide: "",
};

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  // A ref rather than state: whether a real cursor exists is a property of the
  // device, not something a render should ever be waiting on.
  const active = useRef(false);
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    active.current = true;
    document.body.classList.add("has-custom-cursor");
    gsap.set([dot.current, ring.current], { opacity: 1 });

    // quickTo keeps the ring on its own eased follow so it trails the dot.
    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const next = (el?.getAttribute("data-cursor") as CursorState) ?? "default";
      setState((prev) => (prev === next ? prev : next));
    };

    const onLeave = () => setState("hide");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      active.current = false;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!active.current) return;
    const labelled = state === "open" || state === "drag" || state === "link";

    gsap.to(ring.current, {
      width: labelled ? 82 : 34,
      height: labelled ? 82 : 34,
      opacity: state === "hide" ? 0 : 1,
      borderColor: labelled ? "rgba(193,240,3,0)" : "rgba(247,246,246,0.55)",
      backgroundColor: labelled ? "rgba(193,240,3,1)" : "rgba(193,240,3,0)",
      duration: 0.45,
      ease: "expo.out",
    });

    gsap.to(dot.current, {
      scale: labelled ? 0 : 1,
      opacity: state === "hide" ? 0 : 1,
      duration: 0.35,
      ease: "expo.out",
    });
  }, [state]);

  // Always rendered, starting invisible. On a touch device the effect bails and
  // these two nodes simply stay at opacity 0 - cheaper than a state round-trip
  // and it keeps server and client markup identical.
  return (
    <div className="z-[100] fixed inset-0 pointer-events-none">
      <div
        ref={ring}
        className="-top-[17px] -left-[17px] absolute flex justify-center items-center opacity-0 border border-gray-100/55 rounded-full w-[34px] h-[34px] font-medium text-[10px] text-ink tracking-[0.14em]"
      >
        {LABELS[state]}
      </div>
      <div
        ref={dot}
        className="-top-[3px] -left-[3px] absolute bg-brand-green opacity-0 rounded-full w-[6px] h-[6px]"
      />
    </div>
  );
}
