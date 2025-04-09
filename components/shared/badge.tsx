import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  text: string;
  type?: string;
  className?: string;
}

export const Badge: React.FC<Props> = ({
  className,
  type = "default",
  text,
}) => {
  return (
    <div
      className={cn(
        "rounded-full flex justify-center items-center",
        {
          "px-5 py-2 bg-background text-sm shadow-default": type === "default",
        },
        className
      )}
    >
      {text}
    </div>
  );
};
