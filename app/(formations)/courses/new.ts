"use server";
import { prisma } from "@/lib/prisma";
import { actionuser } from "@/lib/safe-action-client";
import z from "zod";

const schema = z.object({
  id: z.string(),
  star: z.number().optional(),
  name: z.string().optional(),
});
// export const setstar = async (id: string, star: number) => {
//   await prisma.review.update({
//     where: {
//       id: id,
//     },
//     data: {
//       star: star,
//     },
//   });
// };

export const settitle = actionuser
  .inputSchema(schema)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.review.update({
      where: {
        id: parsedInput.id,
        userId: ctx.user.id,
      },
      data: {
        name: parsedInput.name,
      },
    });
  });

export const setstar = actionuser
  .inputSchema(schema)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.review.update({
      where: {
        id: parsedInput.id,
        userId: ctx.user.id,
      },
      data: {
        star: parsedInput.star,
      },
    });
  });

export const deleterev = actionuser
  .inputSchema(schema)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.review.delete({
      where: {
        id: parsedInput.id,
        userId: ctx.user.id,
      },
    });
  });
