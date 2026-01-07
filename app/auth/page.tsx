import PageLayout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { getSession, getUSer } from "@/lib/auth-server";
import { Check, Edit } from "lucide-react";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect, unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUSer();

  if (!user) return unauthorized();

  async function ve() {
    "use server";
    await authClient.sendVerificationEmail({
      email: user.email!,
      callbackURL: "/auth",
    });
    redirect(`/auth/verify?email=${user!.email}`);
  }
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>User Profile </CardTitle>
        <Link className="flex gap-2" href={"/auth/edit"}>
          <Edit size={20} className="inline" /> Edit
        </Link>
      </CardHeader>
      <CardContent>
        <div>Nom </div> {user.name}
      </CardContent>
      <CardContent>
        <div>
          E-Mail{" "}
          {user.emailVerified ? (
            <p className="text-green-400 inline ml-10">
              verifier <Check className="inline" />
            </p>
          ) : (
            <form className="inline ml-10">
              <button formAction={ve} className="text-red-400 text-right">
                Non Verifier
              </button>
            </form>
          )}{" "}
        </div>{" "}
        {user.email}
      </CardContent>
    </Card>
  );
}
