import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
}
//
