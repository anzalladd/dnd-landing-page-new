import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";

export function ContactCard() {
  return (
    <div className="relative rounded-[10px] bg-card-black h-[232px] overflow-hidden p-6 flex flex-col">
      <div className="absolute right-0 top-0 w-[259px] h-[258px] pointer-events-none">
        <Image src="/images/contact-vector.svg" alt="Contact Graphic" fill className="object-contain object-right-top" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <Pill className="bg-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-sm font-medium text-white">Contact Us</span>
        </Pill>
        
        <div className="w-[397px] max-w-full flex flex-col gap-4">
          <p className="text-gray-100 font-signifier text-xl leading-snug pr-12">
            We are happy to talk with you anytime.<br/>Whether it&apos;s for a new project, a collaboration or a portfolio review.
          </p>
          <div className="flex items-center gap-1 text-white cursor-pointer w-fit">
            <span className="text-sm font-medium">Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
