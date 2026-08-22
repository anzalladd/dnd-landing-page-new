"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkCard } from "./WorkCard";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultDesc = "Brand and digital experience for Medno, turning corporate health from a black box into a managed function — strategy, identity, motion, and web design.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-card-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white">
      <section ref={containerRef} className="w-full max-w-[1440px] mx-auto px-4 md:px-[60px] pt-10 md:pt-[80px] pb-6 md:pb-[40px] flex flex-col gap-8 md:gap-[60px]">
      
      {/* Title */}
      <div className="max-w-[810px]">
        <h2 className="font-serif text-[32px] md:text-[48px] leading-[1.2] md:leading-[56px] tracking-[-0.01em] text-[#00302E]">
          We work with growing companies across industries, on both design and code.
        </h2>
      </div>

      {/* Grid container */}
      <div className="flex flex-col gap-[40px] w-full">
        
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row justify-between gap-[24px] w-full">
          <WorkCard 
            title="Client Name" 
            tags={["Brand", "Website"]} 
            description={defaultDesc} 
            isLarge={true} 
            className="work-card-reveal"
          />
          <WorkCard 
            title="Client Name" 
            tags={["Brand", "Website"]} 
            description={defaultDesc} 
            className="work-card-reveal"
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row justify-between gap-[24px] w-full items-center">
          <WorkCard 
            title="Client Name" 
            tags={["Brand", "Website"]} 
            description={defaultDesc} 
            className="work-card-reveal"
          />
          <WorkCard 
            title="Client Name" 
            tags={["Brand", "Website"]} 
            description={defaultDesc} 
            className="work-card-reveal"
          />
          <WorkCard 
            title="Client Name" 
            tags={["Brand", "Website"]} 
            description={defaultDesc} 
            className="work-card-reveal"
          />
        </div>

      </div>
    </section>
    </div>
  );
}
