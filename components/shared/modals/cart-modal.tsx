"use client";

import { Dialog } from "@/components/ui";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { useRouter } from "next/navigation";
import { CartModalForm } from "../cart-modal-form";
import { cn } from "@/lib/utils";
import { productFull } from "@/@types/prisma";

interface Props {
  product: productFull;
  className?: string;
}

export const CartModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("max-w-[912px]  min-h-[580px]", className)}>
        <DialogTitle className="text-[50px] font-bold uppercase">
          cart and order
        </DialogTitle>
        <CartModalForm product={product} />
      </DialogContent>
    </Dialog>
  );
};
