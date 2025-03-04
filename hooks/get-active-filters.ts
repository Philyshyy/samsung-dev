import { Filters } from "./use-filters";

export const getActiveFilters = (filters: Filters): string[] => {
  const result: string[] = [];

  if (filters.prices.priceFrom || filters.prices.priceTo) {
    if (filters.prices.priceFrom)
      result.push(`Price from: ${filters.prices.priceFrom}`);
    if (filters.prices.priceTo)
      result.push(`Price to: ${filters.prices.priceTo}`);
  }

  if (filters.selectedSeries.size > 0) {
    result.push(`Series: ${Array.from(filters.selectedSeries).join(", ")}`);
  }

  if (filters.selectedShopping.size > 0) {
    result.push(`Shopping: ${Array.from(filters.selectedShopping).join(", ")}`);
  }

  if (filters.selectedStorage.size > 0) {
    result.push(`Storage: ${Array.from(filters.selectedStorage).join(", ")}`);
  }

  return result;
};
