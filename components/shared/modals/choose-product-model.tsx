"use client";

import { Dialog } from "@/components/ui";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ProductForm } from "../product-form";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModel: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("max-w-[912px]  min-h-[580px]")}>
        <DialogTitle className="text-[50px] font-bold uppercase">
          cart and order
        </DialogTitle>
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
};
