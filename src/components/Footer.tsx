import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-white flex flex-col items-center py-[80px] px-4 md:px-[60px]">
      <div className="w-full max-w-[1320px] flex flex-col items-center gap-[60px]">
        
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Left Links */}
          <div className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-6 lg:gap-[32px] w-full lg:w-[312px]">
            <Link href="#" className="font-sans font-medium text-[16px] md:text-[18px] leading-[28px] text-[#00302E] hover:opacity-70 transition-opacity">
              Instagram
            </Link>
            <Link href="#" className="font-sans font-medium text-[16px] md:text-[18px] leading-[28px] text-[#00302E] hover:opacity-70 transition-opacity">
              Dribbble
            </Link>
            <Link href="#" className="font-sans font-medium text-[16px] md:text-[18px] leading-[28px] text-[#00302E] hover:opacity-70 transition-opacity">
              Behance
            </Link>
          </div>

          {/* Center Logo */}
          <div className="relative w-[200px] md:w-[334px] h-[100px] md:h-[169.5px]">
            <Image 
              src="/images/footer-logo.svg" 
              alt="D&D Logo" 
              fill 
              className="object-contain"
            />
          </div>

          {/* Right Links */}
          <div className="flex flex-row flex-wrap justify-center lg:justify-end items-center gap-6 lg:gap-[32px] w-full lg:w-[312px]">
            <Link href="#" className="font-sans font-medium text-[16px] md:text-[18px] leading-[28px] text-[#00302E] hover:opacity-70 transition-opacity">
              Book a Call
            </Link>
            <Link href="#" className="font-sans font-medium text-[16px] md:text-[18px] leading-[28px] text-[#00302E] hover:opacity-70 transition-opacity">
              Email
            </Link>
            <Link href="#" className="font-sans font-medium text-[16px] md:text-[18px] leading-[28px] text-[#00302E] hover:opacity-70 transition-opacity">
              Ventures
            </Link>
          </div>
        </div>

        {/* Subtext */}
        <div className="flex flex-col items-center gap-4 text-center mt-4 md:mt-0">
          <p className="font-sans text-[16px] md:text-[18px] leading-[28px] text-[#00302E] opacity-80">
            ©2026 D&D Associates. All Rights Reserved.<br />
            Born in Jakarta, growing internationally.
          </p>
        </div>

      </div>
    </footer>
  );
}
