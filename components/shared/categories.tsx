"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const parseUrlParams = (searchParams: URLSearchParams) => {
    const params = {
      prices: {
        priceFrom: searchParams.get("priceFrom"),
        priceTo: searchParams.get("priceTo"),
      },
      selectedShopping: new Set(searchParams.getAll("shopping")),
      selectedSeries: new Set(searchParams.getAll("series")),
      selectedStorage: new Set(searchParams.getAll("storage")),
    };
    return params;
  };

  useEffect(() => {
    const filters = parseUrlParams(searchParams);
    const categoriesList = transformFiltersToCategories(filters);
    setActiveFilters(categoriesList);
  }, [searchParams]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformFiltersToCategories = (filters: any) => {
    const categoriesList = [];

    // Преобразование фильтра для цен
    if (filters.prices) {
      categoriesList.push(`From ${filters.prices.priceFrom}$`);
      categoriesList.push(`To ${filters.prices.priceTo}$`);
    }

    // Преобразование фильтра для серий
    if (filters.selectedSeries.size > 0) {
      categoriesList.push(
        `Series ${Array.from(filters.selectedSeries).join(", ")}`
      );
    }

    // Преобразование фильтра для хранения
    if (filters.selectedStorage.size > 0) {
      categoriesList.push(
        `Storage ${Array.from(filters.selectedStorage).join(", ")}`
      );
    }

    // Преобразование фильтра для покупок
    if (filters.selectedShopping.size > 0) {
      categoriesList.push(
        `Shopping ${Array.from(filters.selectedShopping).join(", ")}`
      );
    }

    return categoriesList;
  };

  return (
    <div className="flex items-center gap-4 ">
      <span className="text-xl">
        Current filter{" "}
        <span className="text-foreground opacity-30 font-normal text-sm">
          {activeFilters.length} results
        </span>
      </span>
      {activeFilters.map((category, index) => {
        return (
          <a
            key={index}
            className={cn("flex items-center h-9 px-7 bg-darkgrey rounded-md")}
          >
            <button className="flex gap-3 items-center">
              {category} <X size={18} />
            </button>
          </a>
        );
      })}
      {activeFilters.length > 1 && (
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
