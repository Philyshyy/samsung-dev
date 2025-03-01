import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { CircleHelp } from "lucide-react";

export interface ProductData {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  colors?: string[];
  storage?: number[];
  className?: string;
}

export const ProductCard: React.FC<ProductData> = ({
  id,
  name,
  price,
  imageUrl,
  colors,
  storage,
  className,
}) => {
  return (
    <div className={className}>
      <div className="w-72 bg-lightgrey rounded-md shadow-default py-7 px-5">
        <div className="flex justify-between">
          <div className="flex justify-center items-center py-2 px-5 w-36 h-8 bg-background rounded-lg shadow-default font-[14px]">
            From {price}$
          </div>
          <CircleHelp size={24} className="self-center" />
        </div>
        <img
          src={imageUrl}
          alt={name}
          className="mx-auto mt-6 h-[140px] w-[140px] object-contain"
        />
        <Title text={name} size="sm" className="font-bold mt-3" />
        <div className="flex gap-4 mt-5">
          {colors?.map((item, index) => (
            <div key={index} className="">
              {item}
            </div>
          ))}
        </div>
        <div className="flex mt-5">
          {storage?.map((item, index) => (
            <div key={index} className="text-[14px]">
              {item}
              {index !== storage.length - 1 ? "/" : " Gb"}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Link href={`/product/${id}`}>
            <Button variant="default">Learn more</Button>{" "}
          </Link>
          <Button variant="outline" className="w-24">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};
