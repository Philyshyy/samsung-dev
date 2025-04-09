import React from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({ className }) => {
  return <div className={className}></div>;
};
