import React from "react";

interface WorkCardProps {
  title: string;
  description: string;
  tags: string[];
  isLarge?: boolean;
  className?: string;
}

export function WorkCard({ title, description, tags, isLarge = false, className = "" }: WorkCardProps) {
  return (
    <div className={`flex flex-col gap-6 ${isLarge ? "w-full lg:w-[872px]" : "w-full lg:w-[424px]"} ${className}`}>
      {/* KV Image Placeholder */}
      <div 
        className="w-full bg-[#D9D9D9] transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
        style={{ height: isLarge ? "531px" : "250px" }}
      />
      
      {/* Subcontent */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <h4 className="font-sans font-medium text-[18px] leading-[28px] text-[#00302E]">
            {title}
          </h4>
          <div className="flex items-center gap-2">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="bg-[#00302E] text-white px-2 py-1 rounded-[4px] font-sans text-[12px] leading-[18px] tracking-[0.003em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-[16px] leading-[24px] text-[#242D29] max-w-[424px]">
          {description}
        </p>
      </div>
    </div>
  );
}
