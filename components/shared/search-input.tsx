"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useClickAway, useDebounce } from "react-use";
import React, { useState, useRef } from "react";

export const SearchInput: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const searchRef = useRef(null);

  useClickAway(searchRef, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    },
    250,
    [searchQuery]
  );
  const onClickItem = () => {
    setFocused(false);
    setProducts([]);
    setSearchQuery("");
  };

  return (
    <>
      {focused && <div className="fixed inset-0 bg-black/50 z-40" />}
      <div ref={searchRef} className="relative z-50">
        <div
          className={cn(
            "flex py-1 px-5 justify-between border border-foreground rounded-full bg-white"
          )}
        >
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent"
            onFocus={() => setFocused(true)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search strokeWidth={1} />
        </div>

        {/* Выпадающее меню */}
        {focused && products.length > 0 && (
          <div
            className={cn(
              "absolute left-0 w-full border border-foreground bg-white rounded-xl mt-2 shadow-md transition-all duration-200 transform opacity-0 scale-95",
              focused && "opacity-100 scale-100"
            )}
          >
            {products.map((product) => (
              <Link
                className="flex items-center rounded-xl gap-3 w-full px-4 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
                key={product.id}
                onClick={onClickItem}
              >
                <img
                  className="h-8 w-8"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span className="w-full">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
