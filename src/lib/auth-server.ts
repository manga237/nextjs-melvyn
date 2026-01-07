import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { LIMITATIONS } from "./auth-plan";
import { UserPlan } from "@prisma/client";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session;
};

export const getUSer = async () => {
  const session = await getSession();
  const user = session?.user;

  const lim = LIMITATIONS[user?.plan as UserPlan];

  return { ...user, lim };
};
