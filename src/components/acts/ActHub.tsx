"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP, Flip, prefersReducedMotion } from "@/lib/gsap";
import { setSmootherPaused } from "@/components/motion/SmoothScroll";
import { TeamsCard } from "@/components/cards/TeamsCard";
import { DraftsCard } from "@/components/cards/DraftsCard";
import { ServicesCard } from "@/components/cards/ServicesCard";
import { ContactCard } from "@/components/cards/ContactCard";
import { ProductsCard } from "@/components/cards/ProductsCard";
import { AboutUsCard } from "@/components/cards/AboutUsCard";

/**
 * ACT 4 - the reel resolves into the hub. After three acts of being told the
 * story on rails, the visitor gets the keys: six doors, opened in any order.
 * The grid arriving from off-axis is the payoff for the linear acts before it.
 */
const COLUMNS = [
  ["teams", "drafts"],
  ["services", "contact"],
  ["products", "about"],
] as const;

function CardBody({ id, expanded = false }: { id: string; expanded?: boolean }) {
  switch (id) {
    case "teams":
      return <TeamsCard expanded={expanded} />;
    case "drafts":
      return <DraftsCard />;
    case "services":
      return <ServicesCard />;
    case "contact":
      return <ContactCard />;
    case "products":
      return <ProductsCard />;
    case "about":
      return <AboutUsCard />;
    default:
      return null;
  }
}

export function ActHub() {
  const root = useRef<HTMLElement>(null);
  const banner = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  /* ---------------------------------------------------------------- entrance */
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");

      gsap.from(cards, {
        // Cards arrive from where the reel was heading - off to the right and
        // below - so the hub reads as the reel settling, not a new page.
        xPercent: () => gsap.utils.random(45, 90),
        yPercent: () => gsap.utils.random(25, 55),
        rotate: () => gsap.utils.random(-7, 7),
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: { amount: 0.5, from: "start" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });

      /* --------------------------------------------------- magnetic pointer */
      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
        const rotX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const rotY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          // -0.5..0.5 from the card's own centre, so tilt is independent of size.
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          rotY(px * 7);
          rotX(-py * 7);
        };

        const onLeave = () => {
          rotX(0);
          rotY(0);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  /* ------------------------------------------------------------ open / close */
  const handleCardClick = (id: string) => {
    flipState.current = Flip.getState(`.bento-card[data-flip-id="${id}"]`);
    setSmootherPaused(true);
    setActiveCard(id);
  };

  const handleClose = () => {
    const bannerEl = banner.current;
    const gridCard = document.querySelector<HTMLElement>(
      `.bento-card[data-flip-id="${activeCard}"]`
    );

    if (!bannerEl || !gridCard) {
      setSmootherPaused(false);
      setActiveCard(null);
      return;
    }

    // Dropping the class lets the card cross-fade back to its collapsed content
    // while it shrinks, instead of cutting to it the moment the banner unmounts.
    bannerEl.classList.remove("details-banner");
    gsap.to(bannerEl.querySelector("button"), { opacity: 0, duration: 0.25 });

    const others = gsap.utils
      .toArray<HTMLElement>(".bento-card")
      .filter((card) => card !== gridCard);

    gsap.to(others, { x: 0, y: 0, duration: 0.8, ease: "power3.inOut", overwrite: true });
    gsap.to(others, { opacity: 1, duration: 0.45, delay: 0.35, ease: "power2.out" });

    Flip.fit(bannerEl, gridCard, {
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(gridCard, { opacity: 1 });
        setSmootherPaused(false);
        setActiveCard(null);
      },
    });
  };

  useGSAP(
    () => {
      if (!flipState.current || activeCard === null) return;

      Flip.from(flipState.current, {
        targets: ".details-banner",
        duration: 0.8,
        ease: "power3.inOut",
        absolute: true,
        zIndex: 50,
      });
      flipState.current = null;

      // Push the unselected cards out along their angle from the clicked card.
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
      const activeEl = cards.find((card) => card.dataset.flipId === activeCard);
      if (!activeEl) return;

      const activeRect = activeEl.getBoundingClientRect();
      const activeCx = activeRect.left + activeRect.width / 2;
      const activeCy = activeRect.top + activeRect.height / 2;
      const push = window.innerWidth * 0.8;

      cards.forEach((card) => {
        if (card === activeEl) {
          gsap.set(card, { opacity: 0 });
          return;
        }

        const rect = card.getBoundingClientRect();
        const distX = rect.left + rect.width / 2 - activeCx;
        const distY = rect.top + rect.height / 2 - activeCy;
        const dist = Math.hypot(distX, distY) || 1;

        gsap.to(card, {
          x: (distX / dist) * push,
          y: (distY / dist) * push,
          duration: 0.8,
          ease: "power3.inOut",
          overwrite: true,
        });
        // Fade out well before the travel ends so nothing drifts across the screen.
        gsap.to(card, { opacity: 0, duration: 0.35, ease: "power2.out" });
      });
    },
    { dependencies: [activeCard] }
  );

  /* Escape closes, matching the affordance every other overlay on the web has. */
  useEffect(() => {
    if (!activeCard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* The overlay is portalled to <body>: inside #smooth-content the smoother's
     transform would become its containing block and `fixed` would not be fixed.
     It only exists while a card is open, which is only ever after a click - so
     there is nothing to portal during SSR and no hydration mismatch to guard. */
  const overlay = activeCard && (
    <div className="z-40 fixed inset-0 pointer-events-auto">
      {
        <div
          ref={banner}
          className="relative w-full h-full [&>div]:!w-full [&>div]:!h-full details-banner"
          data-flip-id={activeCard}
        >
          <CardBody id={activeCard} expanded />
          <button
            onClick={handleClose}
            aria-label="Close"
            data-cursor="hide"
            className="top-7 lg:top-10 right-7 lg:right-10 z-50 absolute flex justify-center items-center bg-black/55 lg:bg-white/35 hover:bg-black/70 lg:hover:bg-white/50 backdrop-blur-sm rounded-full w-8 h-8 text-white transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      }
    </div>
  );

  return (
    <section
      ref={root}
      className="relative flex flex-col justify-center items-center bg-paper px-6 py-24 min-h-dvh overflow-hidden font-sans"
    >
      <div className="flex justify-between items-center mx-auto mb-10 w-full max-w-[1440px]">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-900 text-[11px] tracking-[0.3em]">04</span>
          <span className="font-medium text-gray-900/45 text-[11px] tracking-[0.3em]">
            THE STUDIO — OPEN ANY DOOR
          </span>
        </div>
      </div>

      <div
        className="z-10 relative gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto w-full max-w-[1440px]"
        style={{ perspective: "1400px" }}
      >
        {COLUMNS.map((column, index) => (
          <div key={index} className="flex flex-col gap-4">
            {column.map((id) => (
              <div
                key={id}
                className="bento-card origin-center cursor-pointer"
                data-flip-id={id}
                data-cursor="open"
                onClick={() => handleCardClick(id)}
              >
                <CardBody id={id} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {overlay && createPortal(overlay, document.body)}
    </section>
  );
}
