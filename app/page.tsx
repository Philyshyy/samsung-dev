import { Container, Title, Filter, Topbar } from "@/components/shared";
import { FiltersProvider } from "@/store/filters-store";
import { ProductCard } from "@/components/shared/product-card";
import { prisma } from "@/prisma/prisma-client";
import { ProductItem } from "@prisma/client";
import { Suspense } from "react";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          series: true,
        },
      },
    },
  });

  const currentCategory = categories[0]?.products || [];

  const getColors = (items: ProductItem[]) => {
    const colors = new Set<string>();
    items.forEach((item) => {
      if (item.color) {
        colors.add(item.color);
      }
    });
    return Array.from(colors);
  };

  const getStorage = (items: ProductItem[]) => {
    const storage = new Set<number>();
    items.forEach((item) => {
      if (item.size) {
        storage.add(item.size);
      }
    });
    return Array.from(storage);
  };

  return (
    <FiltersProvider>
      <Container>
        <Title text="Phones" size="lg" className="font-bold" />
      </Container>
      <Suspense>
        <Topbar />
      </Suspense>
      <Container className="mt-4 pb-14">
        <div className="flex gap-5">
          {/* Фильтрация */}
          <Suspense>
            <div className="w-[380px]">
              <Filter />
            </div>
          </Suspense>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-4">
              {currentCategory.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.items[0].price}
                  imageUrl={product.imageUrl}
                  colors={getColors(product.items)}
                  storage={getStorage(product.items)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </FiltersProvider>
  );
}
