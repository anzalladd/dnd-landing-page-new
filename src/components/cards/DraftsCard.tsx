import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";

export function DraftsCard() {
  return (
    <div className="relative rounded-[10px] bg-card-blue p-6 h-[452px] flex flex-col justify-between overflow-hidden">
      <div className="absolute left-9 top-3 w-[347px] h-[396px] opacity-90 pointer-events-none">
        <Image src="/images/drafts-vector.svg" alt="Drafts Graphic" fill className="object-contain" />
      </div>
      
      <div className="flex justify-between items-center z-10 relative">
        <Pill>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-sm font-medium text-gray-900">Unsent Drafts #1</span>
        </Pill>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm font-medium text-gray-900">See all</span>
          <ArrowUpRight className="w-4 h-4 text-gray-900" />
        </div>
      </div>
      
      <div className="z-10 relative pb-4">
        <h3 className="font-signifier text-2xl text-gray-800 leading-snug">
          &quot;You&apos;ll reply to a client&apos;s feedback in under 2 minutes, but your mom&apos;s text has been sitting unread since Tuesday.&quot;
        </h3>
      </div>
    </div>
  );
}
