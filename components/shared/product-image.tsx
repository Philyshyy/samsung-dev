import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  imageUrl: string;
  className?: string;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
      />
    </div>
  );
};
