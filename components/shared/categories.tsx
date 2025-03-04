"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import qs from "qs";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const parsedFilters = qs.parse(searchParams.toString());

  function getActiveFilters(obj: qs.ParsedQs): string[] {
    const result: string | string[] = [];

    for (const key in obj) {
      if (typeof obj[key] === "string" && obj[key].includes(",")) {
        result.push(...obj[key].split(",").map((item) => item.trim()));
      } else if (obj[key]) {
        result.push(String(obj[key]));
      }
    }

    return result;
  }

  const activeFilters = getActiveFilters(parsedFilters);

  console.log(parsedFilters);
  return (
    <div className="flex items-center gap-4">
      <span className="text-xl">
        Current filter{" "}
        <span className="text-foreground opacity-30 font-normal text-sm">
          26 results
        </span>
      </span>
      {activeFilters.map((item) => (
        <div
          key={item}
          className={cn("flex items-center h-9 px-7 bg-darkgrey rounded-md")}
        >
          <button className="flex gap-3 items-center">
            {item} <X size={18} />
          </button>
        </div>
      ))}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-4">
          <hr className="w-[1px] h-9 bg-darkgrey" />
          <button
            className={cn(
              "flex items-center text-CTA bg-background font-bold h-9 px-9 rounded-md gap-2"
            )}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
