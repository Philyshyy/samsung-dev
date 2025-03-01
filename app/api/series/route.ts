import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const series = await prisma.series.findMany();

  return NextResponse.json(series);
}
