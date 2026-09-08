"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * ACT 3 — the work, moving sideways while the page moves down. Vertical scroll
 * is translated into horizontal travel so the reel reads as one continuous
 * shelf rather than a list of separate projects.
 */
export const REEL = [
  {
    id: "01",
    client: "Nexore",
    title: "Making AI tangible for enterprises navigating transformation",
    tags: ["Brand", "Strategy", "Website"],
    image: "/images/teams-case-study.png",
    year: "2025",
  },
  {
    id: "02",
    client: "Halden",
    title: "A design language that scales across twelve markets",
    tags: ["Design System", "Product"],
    image: "/images/services-image.png",
    year: "2025",
  },
  {
    id: "03",
    client: "Vireo",
    title: "Editorial storytelling for a research institute",
    tags: ["Editorial", "Art Direction"],
    image: "/images/about-human.png",
    year: "2024",
  },
  {
    id: "04",
    client: "Marsh & Co",
    title: "Commerce that feels like a considered object",
    tags: ["E-commerce", "Motion"],
    image: "/images/cta-shells.png",
    year: "2024",
  },
];

export function ActReel() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trackEl = track.current;
    if (!trackEl || prefersReducedMotion()) return;

    // Measured in a function so invalidateOnRefresh re-reads it after a resize
    // instead of scrolling to a distance computed at the old viewport width.
    const distance = () => trackEl.scrollWidth - window.innerWidth;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: () => `+=${distance()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(trackEl, { x: () => -distance(), ease: "none" });

    // Images drift against the travel — the classic depth cue that makes a
    // horizontal reel feel like a camera pan instead of a sliding div.
    gsap.utils.toArray<HTMLElement>(".reel-image").forEach((img) => {
      timeline.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none" }, 0);
    });

    return () => timeline.kill();
  }, { scope: root });

  return (
    <section ref={root} className="relative bg-ink h-dvh overflow-hidden">
      <div className="top-0 left-0 absolute flex justify-between items-center px-6 md:px-12 pt-10 w-full">
        <div className="flex items-center gap-4">
          <span className="font-medium text-brand-green text-[11px] tracking-[0.3em]">03</span>
          <span className="font-medium text-gray-100/45 text-[11px] tracking-[0.3em]">
            SELECTED WORK
          </span>
        </div>
        <span className="hidden md:block font-medium text-gray-100/45 text-[11px] tracking-[0.3em]">
          {REEL.length} PROJECTS
        </span>
      </div>

      <div
        ref={track}
        data-cursor="drag"
        className="flex items-center gap-5 md:gap-8 px-6 md:px-12 h-full w-max"
      >
        {REEL.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col w-[78vw] md:w-[46vw] lg:w-[36vw] shrink-0"
          >
            <div className="relative bg-card-dark rounded-[10px] w-full h-[52vh] overflow-hidden">
              <div className="absolute inset-0 scale-115 reel-image">
                <Image
                  src={item.image}
                  alt={item.client}
                  fill
                  sizes="(max-width: 768px) 78vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="top-4 left-4 absolute bg-ink/60 backdrop-blur-sm px-2.5 py-1 rounded-[5px] font-medium text-gray-100 text-[10px] tracking-[0.18em]">
                {item.id} / {item.year}
              </span>
            </div>

            <div className="flex flex-col gap-3 pt-5">
              <div className="flex justify-between items-baseline gap-4">
                <h3 className="font-signifier text-gray-100 text-2xl md:text-3xl leading-tight">
                  {item.client}
                </h3>
                <span
                  data-cursor="link"
                  className="flex items-center gap-1 text-gray-100/60 hover:text-brand-green text-sm transition-colors shrink-0"
                >
                  Live site
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <p className="max-w-[38ch] text-gray-100/55 text-sm leading-relaxed">{item.title}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 border border-gray-100/15 rounded-[5px] text-gray-100/70 text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* Closing panel — turns the end of the reel into the doorway to the hub. */}
        <div className="flex flex-col justify-center gap-5 pr-12 w-[70vw] md:w-[32vw] shrink-0">
          <p className="font-signifier text-gray-100 text-3xl md:text-4xl leading-tight">
            That&apos;s the shelf.
            <br />
            Now open the studio.
          </p>
          <span className="font-medium text-brand-green text-[11px] tracking-[0.3em]">
            KEEP SCROLLING ↓
          </span>
        </div>
      </div>
    </section>
  );
}
