import PageLayout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import ReviewForm from "@app/review-form";
import { notFound } from "next/navigation";

type prop = {
  params: {
    userId: string;
  };
};

export default async function Page({ params }: prop) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) notFound();
  return (
    <PageLayout>
      <Button variant={"outline"} size={"sm"} className="p-5">
        <Avatar className="size-8 ">
          {user.image ? <AvatarImage src={user.image} /> : null}

          <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <p>{user.name.toUpperCase()}</p>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Share Review Link</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={`https://mehb.vercel.app/post-review/${user?.id}`}
            readOnly
          />
        </CardContent>
      </Card>
      <p>Merci pour ton Commentaire !!!!</p>
    </PageLayout>
  );
}
