import { UserPlan } from "@prisma/client";

export const LIMITATIONS: Record<UserPlan, { limit: number }> = {
  PRO: {
    limit: 999,
  },
  FREE: {
    limit: 5,
  },
};
