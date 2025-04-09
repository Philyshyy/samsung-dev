import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "./badge";

interface Props {
  imageUrl: string;
  size?: string;
  isNew?: boolean;
  className?: string;
}

export const ProductImage: React.FC<Props> = ({
  className,
  isNew = false,
  size = "default",
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        "relative bg-lightgrey border-0 rounded-md ",
        {
          "w-[690px] h-[430px] shadow-default text-sm": size === "default",
          "w-[150px] h-[150px] shadow-default bg-background rounded-[20px]":
            size === "small",
        },
        className
      )}
    >
      {isNew && (
        <Badge text="New" className="absolute left-6 top-6 font-bold" />
      )}
      <img
        src={imageUrl}
        alt="ProductImage"
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all z-10 duration-300",
          { "w-[112px] h-[112px]": size === "small" }
        )}
      />
    </div>
  );
};
