import { CartModal } from "@/components/shared/modals/cart-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function CartModalPage() {
  const id = 1;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      items: true,
      series: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <CartModal product={product}></CartModal>;
}
