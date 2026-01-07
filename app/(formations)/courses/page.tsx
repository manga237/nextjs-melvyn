import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ReviewStar from "./star";
import ReviewTitle from "./edit-title";
import ReviewForm from "@app/review-form";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Banknote, X } from "lucide-react";
import { getUSer } from "@/lib/auth-server";
import { deleterev } from "./new";
import { Input } from "@/components/ui/input";
import { UserPlan } from "@prisma/client";
import { off } from "process";
import { Alert, AlertTitle } from "@/components/ui/alert";

// type prop = {
//   params: {
//     sl: string[];
//   };
// };
export const metadata: Metadata = {
  title: "COURSES",
};

export default async function Page() {
  const user = await getUSer();
  let r;
  let offi;
  if (user) {
    r = await prisma.review.findMany({ where: { userId: user.id } });
    //const revies = await prisma.review.findMany();
    offi = r.length >= user.lim.limit;
    console.log({ user, r });
    console.log();
  } else {
    r = await prisma.review.findMany();
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Share Review Link</CardTitle>
        </CardHeader>
        <CardContent>
          {offi ? (
            <Alert>
              <Banknote />
              <AlertTitle>vous avez atteint la limite </AlertTitle>
            </Alert>
          ) : (
            <Input
              value={`http://localhost:3000/post-review/${user?.id}`}
              readOnly
            />
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        {r.map((n) => (
          <Card key={n.id} className="relative">
            <div className="absolute right-5">
              <form>
                <Button
                  className="bg-red-500"
                  formAction={async () => {
                    "use server";
                    deleterev({ id: n.id });
                    revalidatePath("/courses");
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
        {!offi ? <ReviewForm /> : <p>Vous avez atteint votre limite </p>}
      </Card>
    </>
  );
}
{
  /* <div
        className="m-5 rounded-md p-5"
        style={{ boxShadow: "0px 0px 4px 1px #d1d5dc" }}
      >
        Plan de Formatiom
      </div> */
}
