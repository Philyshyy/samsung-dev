"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Props {
  className?: string;
}

interface Filters {
  prices: {
    priceFrom: string | null;
    priceTo: string | null;
  };
  selectedShopping: Set<string>;
  selectedSeries: Set<string>;
  selectedStorage: Set<string>;
}

export const Categories: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const parseUrlParams = (searchParams: URLSearchParams): Filters => {
    return {
      prices: {
        priceFrom: searchParams.get("priceFrom"),
        priceTo: searchParams.get("priceTo"),
      },
      selectedShopping: new Set(searchParams.getAll("shopping")),
      selectedSeries: new Set(searchParams.getAll("series")),
      selectedStorage: new Set(searchParams.getAll("storage")),
    };
  };

  const transformFiltersToCategories = (filters: Filters): string[] => {
    const categories: string[] = [];

    if (filters.prices.priceFrom || filters.prices.priceTo) {
      const priceFrom = filters.prices.priceFrom || "0";
      const priceTo = filters.prices.priceTo || "10000";
      categories.push(`Price: ${priceFrom}$ - ${priceTo}$`);
    }

    const setToString = (set: Set<string>, prefix: string) => {
      if (set.size > 0) {
        return `${prefix}: ${Array.from(set).join(", ")}`;
      }
      return null;
    };

    const series = setToString(filters.selectedSeries, "Series");
    const storage = setToString(filters.selectedStorage, "Storage");
    const shopping = setToString(filters.selectedShopping, "Shopping");

    if (series) categories.push(series);
    if (storage) categories.push(storage);
    if (shopping) categories.push(shopping);

    return categories;
  };

  const filters = useMemo(() => parseUrlParams(searchParams), [searchParams]);
  const categoriesList = useMemo(
    () => transformFiltersToCategories(filters),
    [filters]
  );

  useEffect(() => {
    setActiveFilters(categoriesList);
  }, [categoriesList]);

  return (
    <div className="flex items-center gap-4">
      <span className="text-xl">
        Current filter{" "}
        <span className="text-foreground opacity-30 font-normal text-sm">
          26 results
        </span>
      </span>
      {activeFilters.map((category, index) => (
        <div
          key={index}
          className={cn("flex items-center h-9 px-7 bg-darkgrey rounded-md")}
        >
          <button className="flex gap-3 items-center">
            {category} <X size={18} />
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
