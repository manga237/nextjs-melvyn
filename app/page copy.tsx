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
  const r = await prisma.review.findMany();
  console.log(r);

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
      <div className="flex flex-col gap-2">
        {r.map((n) => (
          <Card key={n.id} className="relative">
            <div className="absolute right-5">
              <form>
                <Button
                  className="bg-red-500"
                  formAction={async () => {
                    "use server";

                    await prisma.review.delete({
                      where: {
                        id: n.id,
                      },
                    });
                    revalidatePath("/");
                  }}
                  variant={"outline"}
                >
                  <X size={20} />
                </Button>
              </form>
            </div>
            <CardHeader>
              <ReviewStar id={n.id} a={n.star} />
              <CardTitle className="text-2xl">
                <ReviewTitle id={n.id} titre={n.name} />
              </CardTitle>
            </CardHeader>
            <CardContent>{n.review} </CardContent>
          </Card>
        ))}
      </div>
      <Card className="px-4">
        <ReviewForm />
      </Card>
    </PageLayout>
  );
}
