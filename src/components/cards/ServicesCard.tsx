import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BirdScatter } from "@/components/ui/BirdScatter";

export function ServicesCard() {
  return (
    <div className="relative rounded-[10px] bg-card-dark h-[604px] overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <Pill>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-sm font-medium text-gray-900">Services</span>
          <ArrowUpRight className="w-4 h-4 text-gray-900" />
        </Pill>
      </div>
      
      {/* Right side code image */}
      <div className="absolute right-0 top-0 h-full w-[76px]">
        <Image src="/images/services-code-345b2c.png" alt="Code" fill className="object-cover" />
      </div>

      {/* Bird Scatter Animation */}
      <BirdScatter />

      {/* Content */}
      <div className="absolute bottom-8 left-4 w-[347px] flex flex-col gap-3 pr-10">
        <span className="text-white text-sm font-medium tracking-wide">DESIGN SAYS IT</span>
        <p className="text-gray-100 font-signifier text-2xl leading-snug">
          Brand identity, logo systems, typography, UI design. We build the parts people actually see and remember.
        </p>
      </div>
    </div>
  );
}
