"use client";

import { TeamsCard } from "@/components/cards/TeamsCard";
import { DraftsCard } from "@/components/cards/DraftsCard";
import { ServicesCard } from "@/components/cards/ServicesCard";
import { ContactCard } from "@/components/cards/ContactCard";
import { ProductsCard } from "@/components/cards/ProductsCard";
import { AboutUsCard } from "@/components/cards/AboutUsCard";

export default function Home() {
  return (
    <main className="flex justify-center items-center bg-white p-6 min-h-screen font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1440px] w-full mx-auto">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <TeamsCard />
          <DraftsCard />
        </div>
        
        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <ServicesCard />
          <ContactCard />
        </div>
        
        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <ProductsCard />
          <AboutUsCard />
        </div>
      </div>
    </main>
  );
}
