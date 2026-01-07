"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { SignInForm } from "./signin-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { error } from "console";
import { useFormStatus } from "react-dom";
import { ComponentProps, ComponentRef } from "react";

export default function Page() {
  const r = useRouter();
  async function onSubmit(values: FormData) {
    const email = values.get("email") as string;

    await authClient.requestPasswordReset(
      {
        email: email,
        redirectTo: "/auth/reset-paassword",
      },
      {
        onSuccess: () => {
          console.log("bien");
          r.push(`/auth/verify?email=${email}`);
          r.refresh();
        },
        onError(context) {
          toast.error(context.error.message);
        },
      }
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reinitialiser le mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3" action={onSubmit}>
          <Label htmlFor="ee">E-Mail</Label>
          <Input type="email" id="ee" name="email" />
          <Submit type="submit">Reset Password</Submit>
        </form>
      </CardContent>
    </Card>
  );
}

const Submit = (propp: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return <Button disabled={pending || propp.disabled} {...propp} />;
};
