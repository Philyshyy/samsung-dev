"use client";

import React from "react";
import { RangeSlider, Title, CheckboxFilterGroup } from "@/components/shared";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { Button, Input } from "../ui";
import { useQuery, useSeries } from "@/hooks";
import { shoppingPhone } from "./constants";
import { useFiltersContext } from "../../store/filters-store";

interface Props {
  className?: string;
}

export const Filter = ({ className }: Props) => {
  const { series, loading } = useSeries();
  const { filters } = useFiltersContext();

  useQuery(filters);

  const items = series.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div
      className={cn("flex bg-lightgrey rounded-md shadow-default", className)}
    >
      <div className="flex flex-col w-full my-9 mx-5 gap-5">
        {/* Покупка онлайн */}
        <div>
          <CheckboxFilterGroup
            title="Shop online"
            name="shopOnline"
            limit={3}
            items={shoppingPhone}
            loading={loading}
            onClickCheckbox={filters.setShopping}
            selected={filters.selectedShopping}
          />

          <hr className="w-full h-[1px] bg-darkgrey " />
        </div>

        {/* Фильтр цены */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <Title size="sm" text="Price" />
            <ChevronUp size={21} className="self-center" />
          </div>

          <div className="flex rounded-md border border-foreground h-12 justify-between items-center mb-6">
            <Input
              type="number"
              placeholder="From"
              min={0}
              max={10000}
              value={String(filters.prices.priceFrom)}
              onChange={(e) =>
                filters.setPrices(
                  "priceFrom",
                  Math.min(10000, Math.max(0, Number(e.target.value)))
                )
              }
            />
            <hr className="w-[1px] h-8 bg-darkgrey" />
            <Input
              type="number"
              placeholder="To"
              min={0}
              max={10000}
              value={String(filters.prices.priceTo)}
              onChange={(e) =>
                filters.setPrices(
                  "priceTo",
                  Math.min(10000, Math.max(0, Number(e.target.value)))
                )
              }
            />
          </div>

          <RangeSlider
            min={0}
            max={10000}
            step={50}
            value={[
              filters.prices.priceFrom || 0,
              filters.prices.priceTo || 10000,
            ]}
            onValueChange={updatePrices}
          />

          <Button variant="secondary" className="w-44 mt-4">
            Submit
          </Button>
          <hr className="w-full h-[1px] bg-darkgrey mt-5" />
        </div>

        <div>
          <CheckboxFilterGroup
            title="Mobile series name"
            name="checkboxSeriesName"
            defaultItems={items.slice(0, 4)}
            items={items}
            loading={loading}
            onClickCheckbox={filters.setSeries}
            selected={filters.selectedSeries}
          />
        </div>
        <CheckboxFilterGroup
          title="Storage"
          name="storage"
          limit={3}
          items={[
            {
              text: "256 Gb",
              value: "1",
            },
            {
              text: "512 Gb",
              value: "2",
            },
            {
              text: "1024 Gb",
              value: "3",
            },
          ]}
          loading={loading}
          onClickCheckbox={filters.setStorage}
          selected={filters.selectedStorage}
        />
      </div>
    </div>
  );
};
