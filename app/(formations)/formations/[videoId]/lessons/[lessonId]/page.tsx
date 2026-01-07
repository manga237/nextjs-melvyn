import { videos } from "@/components/data";
import PageLayout from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

type prop = {
  params: {
    videoId: string;
    lessonId: string;
  };
};
export default async function Page({ params }: prop) {
  const t = await params;
  const lesson = videos
    .find((n) => n.id == t.videoId)
    ?.lessons.find((n) => n.id == t.lessonId);
  //await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!lesson) {
    notFound();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent className="">{lesson.description}</CardContent>
      <CardFooter>
        <Link href={`/formations/${t.videoId}`}>Back</Link>
      </CardFooter>
    </Card>
  );
}
//
