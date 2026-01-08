"use server";

import { prisma } from "@/lib/prisma";
import { actionClient, actionuser, SafeError } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import z from "zod";
import { formSchema } from "./review-schema";
import { getUSer } from "@/lib/auth-server";

//const user = await getUSer();
type state = { message?: string; error?: string };
// export const formul = async (mes: state, formData: FormData) => {
//   "use server";
//   await new Promise((r) => setTimeout(r, 1000));
//   const nom = formData.get("nom") as string;
//   const rev = formData.get("review") as string;
//   if (nom == "mechant") {
//     // mes.error = "invalid name";
//     return { error: "invalid name" } as state;
//   }
//   await prisma.review.create({
//     data: {
//       name: nom,
//       star: 5,
//       review: rev,
//     },
//   });
//   revalidatePath("/");
//   // mes["message"] = "success";
//   return { message: "success" } as state;
// };

export const safeaction = actionuser
  .inputSchema(formSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    if (ctx.user) {
      console.log(ctx.user.lim.limit);

      //      await new Promise((r) => setTimeout(r, 1000));
      // if (!ctx) {
      //   throw new SafeError("Invalid name");
      // }
      const newrev = await prisma.review.create({
        data: {
          name: input.name,
          star: 5,
          review: input.review,
          userId: ctx.user.id!,
        },
      });

      revalidatePath("/courses");
      return newrev;
    }
  });

export const sharelink = actionClient
  .inputSchema(formSchema.extend({ userid: z.string() }))
  .action(async ({ parsedInput: input }) => {
    const newrev = await prisma.review.create({
      data: {
        name: input.name,
        star: 5,
        review: input.review,
        userId: input.userid,
      },
    });

    revalidatePath("/courses");
    return newrev;
  });
