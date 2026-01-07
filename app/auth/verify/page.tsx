"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const s = useSearchParams().get("email");
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Important: check your e-mail</CardTitle>
          <CardDescription>nous avons envoyer un e-mail à {s}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
