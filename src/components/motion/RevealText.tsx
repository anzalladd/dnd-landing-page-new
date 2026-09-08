"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Where in the viewport the reveal fires. */
  start?: string;
  delay?: number;
  stagger?: number;
  /** Play on mount instead of on scroll — for copy already on screen at load. */
  immediate?: boolean;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
};

/**
 * Masked line-by-line rise. SplitText re-splits on resize, so the mask always
 * matches the wrapped line boxes rather than the ones measured at first paint.
 */
export function RevealText({
  children,
  className = "",
  start = "top 85%",
  delay = 0,
  stagger = 0.09,
  immediate = false,
  as: Tag = "p",
}: Props) {
  const el = useRef<HTMLElement>(null);

  useGSAP(() => {
    const node = el.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      gsap.set(node, { opacity: 1 });
      return;
    }

    const split = SplitText.create(node, {
      type: "lines",
      linesClass: "split-line",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.set(node, { opacity: 1 });
        return gsap.from(self.lines, {
          yPercent: 118,
          duration: 1.1,
          ease: "expo.out",
          stagger,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: node, start, once: true } }),
        });
      },
    });

    return () => split.revert();
  }, { scope: el });

  return (
    <Tag ref={el as never} className={`reveal-pending ${className}`}>
      {children}
    </Tag>
  );
}
