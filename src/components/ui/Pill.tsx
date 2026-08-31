import React from "react";

export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/40 backdrop-blur-sm w-fit ${className}`}>
      {children}
    </div>
  );
}
