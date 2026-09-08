"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { TeamsCard } from "@/components/cards/TeamsCard";
import { DraftsCard } from "@/components/cards/DraftsCard";
import { ServicesCard } from "@/components/cards/ServicesCard";
import { ContactCard } from "@/components/cards/ContactCard";
import { ProductsCard } from "@/components/cards/ProductsCard";
import { AboutUsCard } from "@/components/cards/AboutUsCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Flip);
}

export default function Home() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const container = useRef<HTMLElement>(null);
  const banner = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const handleCardClick = (id: string) => {
    flipState.current = Flip.getState(`.bento-card[data-flip-id="${id}"]`);
    setActiveCard(id);
  };

  const handleClose = () => {
    const bannerEl = banner.current;
    const gridCard = document.querySelector<HTMLElement>(
      `.bento-card[data-flip-id="${activeCard}"]`
    );

    if (!bannerEl || !gridCard) {
      setActiveCard(null);
      return;
    }

    // Dropping the class lets the card cross-fade back to its collapsed content
    // while it shrinks, instead of cutting to it the moment the banner unmounts.
    bannerEl.classList.remove("details-banner");
    gsap.to(bannerEl.querySelector("button"), { opacity: 0, duration: 0.25 });

    const others = (gsap.utils.toArray(".bento-card") as HTMLElement[]).filter(
      (card) => card !== gridCard
    );
    gsap.to(others, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.inOut",
      overwrite: true,
    });
    gsap.to(others, { opacity: 1, duration: 0.45, delay: 0.35, ease: "power2.out" });

    Flip.fit(bannerEl, gridCard, {
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(gridCard, { opacity: 1 });
        setActiveCard(null);
      },
    });
  };

  useGSAP(
    () => {
      if (!flipState.current || activeCard === null) return;

      // Morph the clicked card into the full-screen card
      Flip.from(flipState.current, {
        targets: ".details-banner",
        duration: 0.8,
        ease: "power3.inOut",
        absolute: true,
        zIndex: 50,
      });
      flipState.current = null;

      // Push the unselected cards out along their angle from the clicked card
      const cards = gsap.utils.toArray(".bento-card") as HTMLElement[];
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
    { scope: container, dependencies: [activeCard] }
  );

  // Only ever renders the expanded banner instance, never a grid card.
  const getCardComponent = (id: string) => {
    switch (id) {
      case "teams": return <TeamsCard expanded />;
      case "drafts": return <DraftsCard />;
      case "services": return <ServicesCard />;
      case "contact": return <ContactCard />;
      case "products": return <ProductsCard />;
      case "about": return <AboutUsCard />;
      default: return null;
    }
  };

  return (
    <main
      ref={container}
      className="relative flex justify-center items-center bg-white p-6 min-h-screen overflow-hidden font-sans"
    >
      {/* Full-screen detail card */}
      <div
        className={`fixed inset-0 z-40 ${activeCard ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {activeCard && (
          <div
            ref={banner}
            className="relative w-full h-full [&>div]:!w-full [&>div]:!h-full details-banner"
            data-flip-id={activeCard}
          >
            {getCardComponent(activeCard)}
            {/* white/35 matches the design on the dark panel, but below lg the button
                sits over the light intro card, so it needs its own contrast. */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="top-7 lg:top-10 right-7 lg:right-10 z-50 absolute flex justify-center items-center bg-black/55 lg:bg-white/35 hover:bg-black/70 lg:hover:bg-white/50 backdrop-blur-sm rounded-full w-8 h-8 text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}
      </div>

      {/* Masonry Grid */}
      <div className="z-10 relative gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto w-full max-w-[1440px]">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="bento-card cursor-pointer origin-center" data-flip-id="teams" onClick={() => handleCardClick("teams")}>
            <TeamsCard />
          </div>
          <div className="bento-card cursor-pointer origin-center" data-flip-id="drafts" onClick={() => handleCardClick("drafts")}>
            <DraftsCard />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <div className="bento-card cursor-pointer origin-center" data-flip-id="services" onClick={() => handleCardClick("services")}>
            <ServicesCard />
          </div>
          <div className="bento-card cursor-pointer origin-center" data-flip-id="contact" onClick={() => handleCardClick("contact")}>
            <ContactCard />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <div className="bento-card cursor-pointer origin-center" data-flip-id="products" onClick={() => handleCardClick("products")}>
            <ProductsCard />
          </div>
          <div className="bento-card cursor-pointer origin-center" data-flip-id="about" onClick={() => handleCardClick("about")}>
            <AboutUsCard />
          </div>
        </div>
      </div>
    </main>
  );
}
