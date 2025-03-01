import { cn } from "@/lib/utils";
import React from "react";
import { Categories, Container, SortPopup } from "@/components/shared";

interface Props {
  className?: string;
}

export const Topbar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("sticky top-0 z-10", className)}>
      <Container className="flex items-center justify-between bg-lightgrey mt-9 py-4 px-5 rounded-sm shadow-default w-full">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
