import React from "react";
import { ProductImage } from "./product-image";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { productFull } from "@/@types/prisma";

interface Props {
  product: productFull;
  className?: string;
}

export const CartModalForm: React.FC<Props> = ({ product, className }) => {
  return (
    <div className={cn("", className)}>
      <div className="relative bg-lightgrey pl-6 pt-4 w-full h-[300px] rounded-[25px]">
        <Title text="Cart" size="md" className="font-bold " />
        <p>Choosed products</p>
        <div className="flex mt-5 items-center">
          <ProductImage imageUrl={product.imageUrl} size="small" />
          <div className="ml-5 flex flex-col justify-center ">
            <Title text={product.name} size="sm" className="font-bold" />
            <p className="opacity-40">{product.items[0].color}</p>
            <p className="opacity-40">{product.items[0].size} Gb</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div></div>
      </div>
    </div>
  );
};
