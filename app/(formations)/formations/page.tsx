import { videos } from "@/components/data";
import div from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

// type prop = {
//   params: {
//     sl: string[];
//   };
// };
export const metadata: Metadata = {
  title: "PLAN DE FORMATION",
  description: "salut",
};

export default async function Page() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Plan de Formation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {videos.map((n) => (
            <Link
              key={n.id}
              className="text-indigo-400 underline"
              href={`/formations/${n.id}`}
            >
              {n.title}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
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
