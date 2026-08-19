import React from 'react';
import Image from 'next/image';
import { Target, AppWindow, Type, Aperture } from 'lucide-react';

export function CapabilitiesSection() {
  return (
    <section className="w-full bg-background flex justify-center py-20 px-4 md:px-[60px]">
      <div className="w-full max-w-[1320px] flex flex-col lg:flex-row rounded-[16px] overflow-hidden shadow-sm">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 lg:p-[48px] flex flex-col justify-between min-h-[519px]">
          <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.2] tracking-[-0.005em] text-[#00302E] max-w-[500px]">
            Somewhere between a mood board and a codebase, your brand happens.
          </h3>
          
          <div className="flex flex-col gap-4 border-t border-[#DADADA] pt-8 mt-12">
            <h4 className="font-serif text-[28px] md:text-[32px] font-medium leading-[1.2] tracking-[-0.003em] text-[#00302E]">
              Design says it
            </h4>
            <p className="font-sans text-[16px] leading-[24px] text-[#242D29]">
              Brand identity, logo systems, typography, UI design. We build the parts people actually see and remember. Every screen ties back to one system, not five different styles stitched together.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 bg-[#FCCBA3] relative min-h-[519px] flex items-center justify-center overflow-hidden">
          
          {/* Main Image Container using percentages based on 660x519 */}
          <div className="absolute left-[27.7%] top-[17.9%] w-[46.2%] h-[64.3%] z-10 min-w-[200px]">
            <Image 
              src="/images/laptop.png" 
              alt="Laptop with design overlay" 
              fill 
              className="object-contain"
              sizes="(max-width: 1024px) 50vw, 305px"
            />
          </div>

          {/* Floating Chips */}
          <div className="absolute top-[48%] left-[11%] z-20">
            <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm whitespace-nowrap border border-[#00302E]/10">
              <Aperture size={16} className="text-[#00302E]" />
              <span className="font-sans text-[14px] text-[#00302E]">Visual Identity</span>
            </div>
          </div>

          <div className="absolute top-[13%] left-[28.3%] z-20">
            <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm whitespace-nowrap border border-[#00302E]/10">
              <Target size={16} className="text-[#00302E]" />
              <span className="font-sans text-[14px] text-[#00302E]">Logo & Brandmark</span>
            </div>
          </div>

          <div className="absolute top-[27.7%] left-[63.3%] z-20">
            <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm whitespace-nowrap border border-[#00302E]/10">
              <AppWindow size={16} className="text-[#00302E]" />
              <span className="font-sans text-[14px] text-[#00302E]">Interface Design</span>
            </div>
          </div>

          <div className="absolute top-[75.1%] left-[45.1%] z-20">
            <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm whitespace-nowrap border border-[#00302E]/10">
              <Type size={16} className="text-[#00302E]" />
              <span className="font-sans text-[14px] text-[#00302E]">Typography System</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
