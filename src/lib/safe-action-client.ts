import { createSafeActionClient } from "next-safe-action";
import { getUSer } from "./auth-server";

export class SafeError extends Error {
  constructor(error: string) {
    super(error);
  }
}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeError) return error.message;

    return "Something went wrong";
  },
});

export const actionuser = actionClient.use(async ({ next }) => {
  const user = await getUSer();
  if (!user)
    throw new SafeError("Utilisateur requis pour effectuer cette action");

  return next({ ctx: { user } });
});
