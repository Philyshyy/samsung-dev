import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  series: string;
  shopping: string;
  storage: string;
}

export interface Filters {
  selectedSeries: Set<string>;
  selectedShopping: Set<string>;
  selectedStorage: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setStorage: (value: string) => void;
  setShopping: (value: string) => void;
  setSeries: (value: string) => void;
  resetFilters: () => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedSeries, { toggle: toggleSeries }] = useSet<string>(
    new Set(searchParams.get("series")?.split(","))
  );

  const [selectedShopping, { toggle: toggleShopping }] = useSet<string>(
    new Set(
      searchParams.has("shopping")
        ? searchParams.get("shopping")?.split(",")
        : []
    )
  );

  const [selectedStorage, { toggle: toggleStorage }] = useSet<string>(
    new Set(
      searchParams.has("storage") ? searchParams.get("storage")?.split(",") : []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    selectedSeries.clear();
    selectedShopping.clear();
    selectedStorage.clear();
    setPrices({ priceFrom: undefined, priceTo: undefined });
  };

  return useMemo(
    () => ({
      selectedSeries,
      selectedShopping,
      selectedStorage,
      prices,
      setPrices: updatePrices,
      setStorage: toggleStorage,
      setSeries: toggleSeries,
      setShopping: toggleShopping,
      resetFilters,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedSeries, selectedShopping, selectedStorage, prices]
  );
};
