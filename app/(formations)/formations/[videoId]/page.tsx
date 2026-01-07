import { videos } from "@/components/data";
import PageLayout from "@/components/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { title } from "process";

type prop = {
  params: {
    videoId: string;
  };
};

export const generateMetadata = async ({ params }: prop): Promise<Metadata> => {
  const a = await params;
  return {
    title: `video ${a.videoId}`,
  };
};

export default async function Page({ params }: prop) {
  const t = await params;
  const video = videos.find((n) => n.id == t.videoId);
  // await new Promise((r) => setTimeout(r, 500));
  if (!video) {
    notFound();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{video?.title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ul className="list-disc list-inside">
          {video?.lessons.map((n) => (
            <li key={n.title}>
              <Link href={`/formations/${video.id}/lessons/${n.id}`}>
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={"/formations"}>Back</Link>
      </CardFooter>
    </Card>
  );
}
