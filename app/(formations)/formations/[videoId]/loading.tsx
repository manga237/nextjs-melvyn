import { videos } from "@/components/data";
import PageLayout from "@/components/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type prop = {
  params: {
    videoId: string;
  };
};
export default async function Page({ params }: prop) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-full text-center"> video</Skeleton>
        <Skeleton className="h-15 w-80" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
}
