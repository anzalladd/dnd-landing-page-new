"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pill } from "@/components/ui/Pill";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const SHOWCASE = [
  {
    id: "01",
    client: "Nexore",
    title: "Brand identity, logo systems, typography, UI design.",
    description: "Making AI tangible for enterprises navigating transformation",
    tags: ["Brand", "Strategy", "Website"],
    image: "/images/teams-case-study.png",
  },
  {
    id: "02",
    client: "Halden",
    title: "A design language that scales across twelve markets.",
    description: "Rebuilding a fragmented product suite into one coherent system",
    tags: ["Design System", "Product", "Web App"],
    image: "/images/services-image.png",
    tint: "bg-card-dark",
  },
  {
    id: "03",
    client: "Vireo",
    title: "Editorial storytelling for a research institute.",
    description: "Turning dense reports into something people actually finish reading",
    tags: ["Editorial", "Art Direction", "CMS"],
    image: "/images/about-human.png",
    tint: "bg-card-green",
  },
  {
    id: "04",
    client: "Marsh & Co",
    title: "Commerce that feels like a considered object.",
    description: "A slower, quieter storefront for a studio that makes things by hand",
    tags: ["E-commerce", "Motion", "Shopify"],
    image: "/images/cta-shells.png",
    tint: "bg-card-light",
  },
];

// Rendered twice: above the stack on small screens, beside it from lg up.
function IntroPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative bg-card-light rounded-[10px] overflow-hidden ${className}`}>
      <div className="top-0 right-0 absolute w-[55%] h-full">
        <Image
          src="/images/teams-vector.svg"
          alt=""
          fill
          sizes="(max-width: 1024px) 60vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="relative flex flex-col justify-center gap-3 p-4 h-full">
        <span className="text-gray-900 text-base">FEATURED WORK</span>
        <p className="font-signifier text-gray-900 text-xl lg:text-2xl leading-snug">
          In most projects, the two go hand in hand: strategy and implementation. We work with organizations to determine how the brand should be perceived. And then we put that into practice.
        </p>
      </div>
    </div>
  );
}

function ContactPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col justify-between gap-6 bg-[#21201c] p-4 rounded-[10px] ${className}`}>
      <Pill className="bg-white/35">
        <div className="bg-brand-green w-2.5 h-2.5" />
        <span className="text-gray-900 text-sm">Say hi!</span>
      </Pill>
      <div className="flex flex-col gap-4">
        <p className="font-signifier text-gray-100 text-xl lg:text-2xl leading-snug">
          We are happy to talk with you anytime.
          <br />
          Wir freuen uns von dir zu hören!
        </p>
        <div className="flex items-center gap-1 w-fit text-white cursor-pointer">
          <span className="text-base">Start a Project</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export function TeamsCard({ expanded = false }: { expanded?: boolean }) {
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!expanded || !scroller.current || !track.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");
      if (cards.length < 2) return;

      // The stage is held by CSS `sticky` rather than a ScrollTrigger pin: pinning
      // inside a non-window scroller has to reposition the stage from a scroll
      // handler, which can't stay in sync with the browser's scroll painting and
      // reads as shaking. Sticky is composited, so only the cards animate here.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track.current,
          scroller: scroller.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        const previous = cards[index - 1];
        timeline
          .fromTo(card, { yPercent: 100 }, { yPercent: 0, ease: "none" }, index - 1)
          .to(previous, { scale: 0.94, ease: "none" }, index - 1)
          // Darken with a scrim rather than fading the card, which would let the
          // card beneath show through.
          .to(previous.querySelector(".card-scrim"), { opacity: 0.55, ease: "none" }, index - 1);
      });

      ScrollTrigger.refresh();
    },
    { scope: scroller, dependencies: [expanded] }
  );

  return (
    <div className="relative rounded-[10px] w-full h-[384px] overflow-hidden">
      <Image
        src="/images/teams-case-study.png"
        alt="Teams"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="[.details-banner_&]:opacity-0 object-cover transition-opacity duration-[350ms] delay-[120ms]"
        priority
      />
      <div className="top-6 left-6 absolute [.details-banner_&]:opacity-0 transition-opacity duration-[250ms]">
        <Pill>
          <div className="bg-brand-green rounded-full w-2.5 h-2.5" />
          <span className="font-medium text-gray-900 text-sm">Our Projects</span>
          <ArrowUpRight className="w-4 h-4 text-gray-900" />
        </Pill>
      </div>

      {/* Expanded (details-banner) content.
          Sized to the viewport rather than the card so the morph reveals it by
          clipping instead of re-laying out the whole panel on every frame. */}
      {expanded && (
        <div
          ref={scroller}
          className="top-0 left-0 absolute bg-white opacity-0 [.details-banner_&]:opacity-100 w-screen h-dvh overflow-x-hidden overflow-y-auto overscroll-contain transition-opacity duration-[400ms] delay-[280ms]"
        >
          {/* Below lg there is no room for a side column, so the intro scrolls above the stack */}
          <div className="lg:hidden flex flex-col gap-4 p-4">
            <IntroPanel className="min-h-[300px]" />
            <ContactPanel />
          </div>

          <div ref={track} style={{ height: `${SHOWCASE.length * 100}dvh` }}>
            {/* w-full, not w-screen: the scrollbar takes width off the scroller's
              content box, and 100vw would push the panel's right edge under it. */}
            <div className="top-0 sticky flex gap-4 p-4 lg:p-6 w-full h-dvh">
              {/* Left column - stays put while the cards stack */}
              <div className="hidden lg:flex flex-col gap-4 w-[30%] shrink-0">
                <IntroPanel className="flex-[604] min-h-0" />
                <ContactPanel className="flex-[232] min-h-0" />
              </div>

              {/* Right column - static frame, case studies stack inside it */}
              <div className="flex flex-col flex-1 bg-card-black rounded-[10px] min-w-0 overflow-hidden">
                <div className="px-4 pt-4 shrink-0">
                  <div className="flex justify-between items-center pb-4 border-[#1a1a1a] border-b">
                    <span className="text-white text-base">Case Studies</span>
                  </div>
                </div>

                <div className="relative flex-1 min-h-0 overflow-hidden">
                  {SHOWCASE.map((item, index) => (
                    <section
                      key={item.id}
                      className="absolute inset-0 p-4 showcase-card"
                      style={{ zIndex: index + 1 }}
                    >
                      <div className="relative flex lg:flex-row flex-col bg-[#21201c] rounded-[10px] w-full h-full overflow-hidden">
                        <div className="z-10 absolute inset-0 bg-black opacity-0 pointer-events-none card-scrim" />
                        <div className="flex flex-col lg:justify-between gap-4 lg:gap-0 order-2 lg:order-1 p-4 lg:p-6 w-full lg:w-[35%] min-h-0 shrink-0">
                          <div className="flex items-center gap-3">
                            <span className="tabular-nums text-[#a8a8a8] text-sm">{item.id}</span>
                            <span className="flex-1 bg-white/15 h-px" />
                            <span className="text-white text-sm">{item.client}</span>
                          </div>

                          <div className="flex flex-col gap-3 lg:gap-6">
                            <div className="flex flex-col gap-2 lg:gap-3">
                              <p className="font-signifier text-white text-xl lg:text-2xl leading-snug">{item.title}</p>
                              <p className="text-[#a8a8a8] text-sm tracking-wide">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-1 w-fit text-white cursor-pointer">
                              <span className="text-base">Read live website</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span key={tag} className="bg-white/35 px-2.5 py-1 rounded-[5px] text-white text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div
                          className={`order-1 lg:order-2 relative flex-1 m-4 mb-0 lg:mb-4 lg:ml-0 rounded-[10px] min-h-[120px] overflow-hidden ${item.tint ?? ""}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.client}
                            fill
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            loading="eager"
                            className={item.tint ? "object-contain p-6 lg:p-10" : "object-cover"}
                          />
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
