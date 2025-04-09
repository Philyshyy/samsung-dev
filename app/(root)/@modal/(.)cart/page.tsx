import { ChooseProductModel } from "@/components/shared/modals/choose-product-model";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function CartModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
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

  return <ChooseProductModel product={product}></ChooseProductModel>;
}
