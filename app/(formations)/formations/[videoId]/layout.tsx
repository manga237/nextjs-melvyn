import { videos } from "@/components/data";
import PageLayout from "@/components/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Page({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ videoId: string }>;
}>) {
  const { videoId } = await params;
  const video = videos.find((n) => n.id == videoId);
  if (!video) {
    notFound();
  }
  return (
    <div>
      <header className="border-b -mx-4 px-4 pb-2 mb-2 ">
        <Link href={`/formations/${videoId}`} className="font-bold text-xl">
          /formations/{videoId}
        </Link>
        <div className="ml-2 inline-flex gap-4 text-xs ">
          {video?.lessons.map((n) => (
            <Link key={n.id} href={`/formations/${videoId}/lessons/${n.id}`}>
              {n.title}
            </Link>
          ))}
        </div>
      </header>
      {children}
    </div>
  );
}
