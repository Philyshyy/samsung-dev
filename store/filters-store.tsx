"use client";

import { useFilters } from "@/hooks/use-filters";
import { createContext, ReactNode, useContext } from "react";

export interface FiltersContextType {
  filters: ReturnType<typeof useFilters>;
}

interface FiltersProviderProps {
  children: ReactNode;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const filters = useFilters();
  return (
    <FiltersContext.Provider value={{ filters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("Kaput");
  }
  return context;
};
