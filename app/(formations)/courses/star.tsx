"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setstar } from "./new";

type prop = {
  a: number;
  id: string;
};
export default function ReviewStar({ a, id }: prop) {
  const r = useRouter();
  const [hover, sethover] = useState<number | null>(null);

  return (
    <div
      className=" flex gap-1 items-center font-bold text-2xl text-yellow-400"
      onMouseLeave={() => {
        sethover(null);
      }}
    >
      {[1, 2, 3, 4, 5].map((_, i) => (
        <Star
          onMouseEnter={() => {
            sethover(i + 1);
          }}
          onClick={() => {
            if (Number(hover) != a) {
              // setstar(id, Number(hover));
              setstar({ id, star: hover! });
              r.refresh();
            }
          }}
          key={i}
          className={cn(
            "text-yellow-400 hover:cursor-pointer",
            hover && i < hover
              ? "text-orange-400 fill-orange-400 -translate-y-1 animate-pulse"
              : !hover && i < a
              ? "fill-yellow-400"
              : "",
            "transition-transform duration-300"
          )}
        />
      ))}
      {a}
    </div>
  );
}
