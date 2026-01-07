-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('FREE', 'PRO');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "StripeCustomerId" TEXT,
ADD COLUMN     "plan" "UserPlan" NOT NULL DEFAULT 'FREE';
