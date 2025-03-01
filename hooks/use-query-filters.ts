import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQuery = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      shopping: Array.from(filters.selectedShopping),
      series: Array.from(filters.selectedSeries),
      storage: Array.from(filters.selectedStorage),
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
};
