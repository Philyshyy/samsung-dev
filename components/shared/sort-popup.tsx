import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className="flex items-center
         gap-6"
    >
      <span className="text-xl">Sort by</span>
      <button
        className={cn(
          "flex items-center text-CTA bg-background font-bold h-9 px-9 rounded-md gap-2",
          className
        )}
      >
        Price <ArrowUpDown size={18} />
      </button>
    </div>
  );
};
