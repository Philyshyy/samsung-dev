import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, series } from "./constants";
import { Prisma } from "@prisma/client";

async function up() {
  const randomNumber = (min: number, max: number) => {
    return Math.floor((Math.random() * (max - min) * 10 + min * 10) / 10);
  };

  const generateProductItem = ({
    productId,
    price,
    color,
    size,
  }: {
    productId: number;
    price: number;
    color?: string;
    size?: 256 | 512 | 1024;
  }) => {
    return {
      productId,
      price,
      color,
      size,
    } as Prisma.ProductItemUncheckedCreateInput;
  };

  await prisma.user.createMany({
    data: [
      {
        name: "User TEST",
        email: "user@test.com",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        name: "Admin ADMIN",
        email: "admin@test.com",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({ data: categories });

  await prisma.series.createMany({ data: series });

  const phone1 = await prisma.product.create({
    data: {
      name: "Galaxy Z Fold 5",
      imageUrl: "/galaxyZ5.png",
      seriesId: 2,
      categoryId: 1,
    },
  });
  const phone2 = await prisma.product.create({
    data: {
      name: "Galaxy S24 Ultra",
      imageUrl: "/galaxyS24ultra.svg",
      seriesId: 3,
      categoryId: 1,
    },
  });
  const phone3 = await prisma.product.create({
    data: {
      name: "Galaxy A55 5G",
      imageUrl: "/galaxyA55.png",
      seriesId: 1,
      categoryId: 1,
    },
  });
  const phone4 = await prisma.product.create({
    data: {
      name: "Galaxy XCover 5",
      imageUrl: "/galaxyZ5.png",
      seriesId: 4,
      categoryId: 1,
    },
  });
  const phone5 = await prisma.product.create({
    data: {
      name: "Galaxy A73 5G",
      imageUrl: "/galaxyA55.png",
      seriesId: 1,
      categoryId: 1,
    },
  });

  await prisma.productItem.createMany({
    data: [
      //Galaxy Z5
      generateProductItem({
        productId: phone1.id,
        price: randomNumber(100, 800),
        color: "blue",
        size: 256,
      }),
      generateProductItem({
        productId: phone1.id,
        price: randomNumber(100, 800),
        color: "yellow",
        size: 512,
      }),
      generateProductItem({
        productId: phone1.id,
        price: randomNumber(100, 800),
        color: "black",
        size: 1024,
      }),
      //Galaxy S24 Ultra
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "purple",
        size: 256,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "yellow",
        size: 256,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "grey",
        size: 256,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "purple",
        size: 512,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "yellow",
        size: 512,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "grey",
        size: 512,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "purple",
        size: 1024,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "yellow",
        size: 1024,
      }),
      generateProductItem({
        productId: phone2.id,
        price: randomNumber(100, 800),
        color: "grey",
        size: 1024,
      }),
      //Galaxy A55 5G
      generateProductItem({
        productId: phone3.id,
        price: randomNumber(100, 800),
        color: "blue",
        size: 256,
      }),
      generateProductItem({
        productId: phone3.id,
        price: randomNumber(100, 800),
        color: "yellow",
        size: 512,
      }),
      generateProductItem({
        productId: phone3.id,
        price: randomNumber(100, 800),
        color: "black",
        size: 1024,
      }),
      //Galaxy XCover 5
      generateProductItem({
        productId: phone4.id,
        price: randomNumber(100, 800),
        color: "black",
        size: 256,
      }),
      generateProductItem({
        productId: phone4.id,
        price: randomNumber(100, 800),
        color: "grey",
        size: 512,
      }),
      //Galaxy  A73 5G
      generateProductItem({
        productId: phone5.id,
        price: randomNumber(100, 800),
        color: "purple",
        size: 512,
      }),
      generateProductItem({
        productId: phone5.id,
        price: randomNumber(100, 800),
        color: "black",
        size: 1024,
      }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "11111" },
      { userId: 2, totalAmount: 0, token: "22222" },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
    },
  });
}
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Series" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
