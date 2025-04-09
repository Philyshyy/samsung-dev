import { Container, Title } from "@/components/shared";
import { ProductImage } from "@/components/shared/product-image";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex">
        <ProductImage imageUrl={"/productImg.png"} />
        <div className="ml-5">
          <Title text={product.name} size="md" className="font-bold" />
        </div>
      </div>
    </Container>
  );
}
