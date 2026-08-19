import React from 'react';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section className="w-full bg-background flex justify-center py-[80px] px-4 md:px-[60px]">
      <div className="w-full max-w-[1320px] flex flex-col items-center gap-10">
        
        {/* Main Image */}
        <div className="relative w-full max-w-[876px] aspect-[876/464]">
          <Image 
            src="/images/cta-shells.png" 
            alt="Various natural items and shells" 
            fill 
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 876px"
          />
        </div>

        {/* Text & Buttons */}
        <div className="flex flex-col items-center gap-8 text-center max-w-[800px] mt-4">
          <h2 className="font-serif text-[32px] md:text-[40px] leading-[1.2] md:leading-[48px] tracking-[-0.005em] text-[#00302E]">
            We are happy to talk with you anytime.<br className="hidden md:block" />
            Whether it&apos;s for a new project, a collaboration or a portfolio review.
          </h2>
          
          <div className="flex flex-row items-center gap-4">
            <button className="bg-[#00302E] text-white px-6 py-3 rounded-lg font-sans text-[14px] leading-[22px] transition-opacity hover:opacity-90">
              Start a project
            </button>
            <button className="bg-transparent border border-[#00302E] text-[#00302E] px-6 py-3 rounded-lg font-sans text-[14px] leading-[22px] transition-colors hover:bg-[#00302E]/5">
              Book a call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
