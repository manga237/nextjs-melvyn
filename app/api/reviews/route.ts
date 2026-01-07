import { prisma } from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action-client";
import { route } from "@/lib/zod-route";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  name: z.string(),
  review: z.string(),
});

export const GET = async (req: NextRequest) => {
  const r = await prisma.review.findMany();
  return NextResponse.json({ r });
};

/* export const POST=route.body(schema).handler(async (req,{body:input})=>{
  //const input = schema.parse(body);

  await new Promise((r) => setTimeout(r, 1000));

  if (input.name == "mechant") {
    throw new SafeError("Invalid name");
  }
  const newrev = await prisma.review.create({
    data: {
      name: input.name,
      star: 5, 
      review: input.review,
    },
  });
  return {
    review:newrev
  }
}) */

export const POST = async (request: NextRequest) => {
  console.log(request.nextUrl);
  const body = await request.json();
  const input = schema.extend({ userid: z.string() }).parse(body);

  await new Promise((r) => setTimeout(r, 1000));

  if (input.name == "mechant") {
    throw new SafeError("Invalid name");
  }
  const newrev = await prisma.review.create({
    data: {
      name: input.name,
      star: 5,
      review: input.review,
      userId: input.userid,
    },
  });
  return NextResponse.json({ review: newrev });
};
