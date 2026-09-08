"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { ActHero } from "@/components/acts/ActHero";
import { ActManifesto } from "@/components/acts/ActManifesto";
import { ActReel } from "@/components/acts/ActReel";
import { ActHub } from "@/components/acts/ActHub";

/**
 * Four acts, one scroll.
 *
 *   01  HERO      the mark assembles out of dust, because you scrolled
 *   02  MANIFESTO the thesis, pinned, one sentence that keeps changing subject
 *   03  REEL      the work, travelling sideways while the page goes down
 *   04  HUB       the reel settles into six doors you can open in any order
 *
 * Acts 1-3 are on rails: the studio introduces itself in a fixed order. Act 4
 * hands control back. Earning the grid is the point - it is a reward, not a
 * landing page.
 */
export default function Home() {
  // The hero's scroll timeline stays parked until the curtain is up, so the
  // bird cannot assemble behind the preloader and be missed entirely.
  const [started, setStarted] = useState(false);

  return (
    <>
      <Preloader onDone={() => setStarted(true)} />
      <Cursor />

      <SmoothScroll>
        <main className="relative bg-ink grain">
          <ActHero started={started} />
          <ActManifesto />
          <ActReel />
          <ActHub />

          <footer className="flex md:flex-row flex-col justify-between gap-6 bg-paper px-6 md:px-12 py-10 border-gray-900/10 border-t">
            <span className="font-medium text-gray-900 text-[11px] tracking-[0.3em]">
              D&amp;D ASSOCIATE
            </span>
            <span className="font-medium text-gray-900/45 text-[11px] tracking-[0.3em]">
              JAKARTA / BERLIN — {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </SmoothScroll>
    </>
  );
}
