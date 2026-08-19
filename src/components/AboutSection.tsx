import React from "react";
import Image from "next/image";
import { InteractiveGrid } from "./InteractiveGrid";
import { Chip } from "./Chip";

export function AboutSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-[80px]">
      <InteractiveGrid />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-[60px]">
        
        {/* Title */}
        <h2 className="font-serif text-[32px] md:text-[48px] leading-[1.2] md:leading-[56px] tracking-[-0.01em] text-center text-[#00302E] max-w-[1196px] mx-auto z-10 relative">
          We are a full-service design and code company based in Jakarta and growing internationally
        </h2>

        {/* Desktop Interactive Layout (Hidden on Mobile) */}
        <div className="hidden lg:block relative w-full aspect-[1320/700] mt-[60px]">
          
          {/* Center Image */}
          <div className="absolute left-[50%] top-[24.4%] -translate-x-1/2 w-[21.9%] h-[67.3%] z-10">
            <Image 
              src="/images/hand.png" 
              alt="Hand holding items" 
              fill 
              className="object-contain drop-shadow-xl" 
              sizes="(max-width: 1440px) 22vw, 289px" 
            />
          </div>

          {/* SVG Connectors - z-20 to be above the hand */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1320 700" preserveAspectRatio="none">
            {/* Line to Left Text */}
            <line x1="389" y1="371" x2="644.6" y2="435.6" stroke="#00302E" strokeWidth="1" />
            {/* Line to Top Right Text */}
            <line x1="932" y1="114" x2="644.6" y2="435.6" stroke="#00302E" strokeWidth="1" />
            {/* Line to Bottom Right Text */}
            <line x1="933" y1="596" x2="644.6" y2="435.6" stroke="#00302E" strokeWidth="1" />
            
            {/* Center Diamond */}
            <rect x="628" y="419" width="33" height="33" fill="#00302E" transform="rotate(45 644.6 435.6)" />
            
            {/* Small Squares */}
            <rect x="383" y="365" width="12" height="12" fill="#00302E" />
            <rect x="926" y="108" width="12" height="12" fill="#00302E" />
            <rect x="927" y="590" width="12" height="12" fill="#00302E" />
          </svg>

          {/* Text Blocks */}
          
          {/* Left Block */}
          <div className="absolute left-[1.5%] top-[51.3%] w-[26.9%] flex flex-col gap-4 items-start z-30">
            <p className="font-sans text-[16px] leading-[24px] text-[#012625]">
              One team handles branding, design, and development together. Not three departments passing a file around. The same people writing the strategy are building the site.
            </p>
            <Chip label="Who we are" className="relative pointer-events-auto !static !bg-[#F7F5ED] !border !border-[#00302E]/20" />
          </div>

          {/* Top Right Block */}
          <div className="absolute right-[1.5%] top-[14.6%] w-[26.8%] flex flex-col gap-4 items-start z-30">
            <p className="font-sans text-[16px] leading-[24px] text-[#012625]">
              On the design side: visual identity, logo and brandmark, typography systems, interface design. On the build side: web development, ecommerce, WebGL, no-code.
            </p>
            <Chip label="Our services" className="relative pointer-events-auto !static !bg-[#F7F5ED] !border !border-[#00302E]/20" />
          </div>

          {/* Bottom Right Block */}
          <div className="absolute right-[1.5%] top-[83.6%] w-[26.8%] flex flex-col gap-4 items-start z-30">
            <p className="font-sans text-[16px] leading-[24px] text-[#012625]">
              We stay small so the same people who design your site are the ones who build it. Nobody joins halfway through and has to guess what we were thinking.
            </p>
            <Chip label="How we work" className="relative pointer-events-auto !static !bg-[#F7F5ED] !border !border-[#00302E]/20" />
          </div>

        </div>

        {/* Mobile Layout (Visible on small screens) */}
        <div className="flex flex-col lg:hidden gap-12 mt-12 items-center text-center">
          
          {/* Center Image for Mobile */}
          <div className="relative w-[289px] h-[471px] z-10 mb-8">
            <Image 
              src="/images/hand.png" 
              alt="Hand holding items" 
              fill 
              className="object-contain drop-shadow-xl" 
              sizes="289px" 
            />
          </div>

          <div className="flex flex-col gap-4 items-center max-w-[400px]">
            <p className="font-sans text-[16px] leading-[24px] text-[#012625]">
              One team handles branding, design, and development together. Not three departments passing a file around. The same people writing the strategy are building the site.
            </p>
            <Chip label="Who we are" className="relative pointer-events-auto !static !bg-[#F7F5ED] !border !border-[#00302E]/20" />
          </div>

          <div className="flex flex-col gap-4 items-center max-w-[400px]">
            <p className="font-sans text-[16px] leading-[24px] text-[#012625]">
              On the design side: visual identity, logo and brandmark, typography systems, interface design. On the build side: web development, ecommerce, WebGL, no-code.
            </p>
            <Chip label="Our services" className="relative pointer-events-auto !static !bg-[#F7F5ED] !border !border-[#00302E]/20" />
          </div>

          <div className="flex flex-col gap-4 items-center max-w-[400px]">
            <p className="font-sans text-[16px] leading-[24px] text-[#012625]">
              We stay small so the same people who design your site are the ones who build it. Nobody joins halfway through and has to guess what we were thinking.
            </p>
            <Chip label="How we work" className="relative pointer-events-auto !static !bg-[#F7F5ED] !border !border-[#00302E]/20" />
          </div>

        </div>

      </div>
    </section>
  );
}
