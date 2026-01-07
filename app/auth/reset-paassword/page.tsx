"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { unauthorized, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, Suspense } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function Page() {
  const token1 = useSearchParams();
  const token = token1.get("token");
  const r = useRouter();

  async function onSubmit(f: FormData) {
    const e = f.get("pass") as string;
    if (!token) return unauthorized();

    await authClient.resetPassword(
      {
        newPassword: e,
        token: token,
      },
      {
        onSuccess: () => {
          toast.success("mot de passe changer avec succès");
          r.push("/auth/signin");
        },
        onError(context) {
          toast.error(context.error.message);
        },
      }
    );
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Reinitialiser le mot de passe</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" action={onSubmit}>
            <Label htmlFor="ee">Nouveau Mot de Pase</Label>
            <Input type="password" id="ee" name="pass" />
            <Submit type="submit">Reset Password</Submit>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const Submit = (propp: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return <Button disabled={pending || propp.disabled} {...propp} />;
};
