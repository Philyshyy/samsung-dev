"use client";

import { getActiveFilters } from "@/hooks/get-active-filters";
import { cn } from "@/lib/utils";
import { useFiltersContext } from "@/store/filters-store";
import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = () => {
  const { filters } = useFiltersContext();
  const activeFilters = getActiveFilters(filters);

  const filterScrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent) => {
    if (filterScrollRef.current) {
      filterScrollRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  useEffect(() => {
    const scrollContainer = filterScrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="flex items-center gap-4 h-8">
      <span className="text-xl">
        Current filter{" "}
        <span className="text-foreground opacity-30 font-normal text-sm">
          26 results
        </span>
      </span>
      <div
        className="flex gap-3 items-center max-w-[600px] overflow-x-auto whitespace-nowrap scrollbar"
        ref={filterScrollRef}
      >
        {activeFilters.map((item) => (
          <div
            key={item}
            className={cn(
              "flex items-center h-9 px-7 bg-darkgrey rounded-md flex-shrink-0 mb-1"
            )}
          >
            {item}
          </div>
        ))}
      </div>
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-4">
          <hr className="w-[1px] h-9 bg-darkgrey" />
          <button
            className={cn(
              "flex items-center text-CTA bg-background font-bold h-9 px-9 rounded-md gap-2"
            )}
            onClick={filters.resetFilters}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
