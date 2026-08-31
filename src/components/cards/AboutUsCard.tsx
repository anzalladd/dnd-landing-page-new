import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";

export function AboutUsCard() {
  return (
    <div className="relative rounded-[10px] bg-card-green p-6 h-[574px] overflow-hidden flex flex-col justify-between">
      <div className="absolute right-0 top-[-15px] w-[252px] h-[604px] pointer-events-none">
        <Image src="/images/about-vector.svg" alt="Graphic" fill className="object-contain object-right-top" />
      </div>
      
      <div className="relative z-10 flex justify-between items-start w-full">
        <Pill>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-sm font-medium text-gray-900">Wer Wir Sind</span>
        </Pill>
        <div className="relative w-[63px] h-[32px]">
          <Image src="/images/about-logo.svg" alt="Logo" fill />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-5 mt-auto">
        <div className="relative w-full h-[154px] rounded-lg overflow-hidden">
          <Image src="/images/about-human.png" alt="Human Evolution" fill className="object-cover" />
        </div>
        
        <div className="flex flex-col gap-2">
          <span className="text-black text-sm tracking-wide font-medium">#BEHINDTHEWORK</span>
          <p className="font-signifier text-2xl text-gray-800 leading-snug w-full pr-8">
            We are a full-service design and code company based in Jakarta and growing internationally.
          </p>
        </div>

        <div className="flex items-center gap-1 text-black font-medium text-sm cursor-pointer w-fit mt-2">
          <span>Read more</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
