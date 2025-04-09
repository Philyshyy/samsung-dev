import { Product, ProductItem } from "@prisma/client";

export type productFull = Product & { items: ProductItem[] };
