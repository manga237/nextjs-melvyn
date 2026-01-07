import z from "zod";

export const formSchema = z.object({
  name: z.string().min(4, "nom doit avoir 4 caracteres").max(10),
  review: z.string().min(4, "review doit avoir au moins 4 caracteres"),
});
