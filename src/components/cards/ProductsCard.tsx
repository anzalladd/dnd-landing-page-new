import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";

export function ProductsCard() {
  return (
    <div className="relative rounded-[10px] bg-card-light p-6 h-[262px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <Pill>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-sm font-medium text-gray-900">Products</span>
        </Pill>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm font-medium text-gray-900">See all</span>
          <ArrowUpRight className="w-4 h-4 text-gray-900" />
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center flex-1">
        <h3 className="font-signifier text-2xl text-gray-900 leading-tight">LUXURY PROPERTY WEB</h3>
        <p className="text-black mt-2 text-sm">Things that save us time, now saving yours</p>
      </div>
    </div>
  );
}
