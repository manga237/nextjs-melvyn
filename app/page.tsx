import PageLayout from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { userAgent } from "next/server";
import ReviewTitle from "./(formations)/courses/edit-title";
import ReviewStar from "./(formations)/courses/star";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { X } from "lucide-react";
import ReviewForm from "./review-form";

export default async function Home() {
  const a = userAgent({
    headers: await headers(),
  });
  return (
    <PageLayout className=" text-3xl font-bold">
      <h1>Learn NextJS</h1>
      <Link href={"/courses"}>{a.browser.name}</Link>
      <Link className="text-indigo-400 underline" href={"/formations"}>
        Plan de Formations
      </Link>
      <ModeToggle />
    </PageLayout>
  );
}
