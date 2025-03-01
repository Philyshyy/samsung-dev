import { Api } from "@/services/api-client";
import { Series } from "@prisma/client";
import { useEffect, useState } from "react";

export const useSeries = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchSeries() {
      try {
        setLoading(true);
        const series = await Api.series.getAll();
        setSeries(series);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSeries();
  }, []);
  return { series, loading };
};
