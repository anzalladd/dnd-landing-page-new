"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "./Clock";

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-[60px] md:py-[22px]">
      <div className="w-[200px] flex items-center">
        <Clock />
      </div>

      <Link href="/" className="flex justify-center flex-1">
        <Image 
          src="/images/logo.svg" 
          alt="D&O Logo" 
          width={100} 
          height={51} 
          priority 
          className="w-[80px] h-auto md:w-[100px]"
        />
      </Link>

      <div className="w-[200px] flex justify-end">
        <button className="bg-white text-foreground px-4 py-3 rounded-lg text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm">
          Tell us your project
        </button>
      </div>
    </header>
  );
}
