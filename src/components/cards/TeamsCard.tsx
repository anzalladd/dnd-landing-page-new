import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";

export function TeamsCard() {
  return (
    <div className="relative rounded-[10px] overflow-hidden h-[384px] w-full">
      <Image src="/images/teams-bg.png" alt="Teams" fill className="object-cover" priority />
      <div className="absolute top-6 left-6">
        <Pill>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-sm font-medium text-gray-900">Our Projects</span>
          <ArrowUpRight className="w-4 h-4 text-gray-900" />
        </Pill>
      </div>
    </div>
  );
}
