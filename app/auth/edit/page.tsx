import PageLayout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession, getUSer } from "@/lib/auth-server";
import { Check, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { AccountForm } from "./auth-form";

export default async function AuthPage() {
  const user = await getUSer();

  if (!user) return unauthorized();

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Edit Profile </CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm defaultvalues={{ name: user.name, image: user.image }} />
      </CardContent>
    </Card>
  );
}
