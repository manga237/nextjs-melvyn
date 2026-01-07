import PageLayout from "@/components/layout";
import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return <PageLayout>{children}</PageLayout>;
}
