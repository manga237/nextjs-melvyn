"use client";
import { Check, Clipboard, Edit } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { settitle } from "./new";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type prop = {
  id: string;
  titre: string;
};
export default function ReviewTitle({ id, titre }: prop) {
  const [edit, setedit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [val, setval] = useState(titre);
  const [pend, startpend] = useTransition();
  const r = useRouter();

  const click = () => {
    setedit(false);
    if (val != ref.current!.value) {
      setval(ref.current!.value);
      startpend(() => {
        settitle({ id, name: ref.current!.value });
      });
      r.refresh();
    }
  };

  if (edit) {
    return (
      <div className="bt group flex gap-2">
        <input
          className="p-1"
          style={{ fieldSizing: "content" }}
          ref={ref}
          type="text"
          defaultValue={titre}
          onKeyDown={(e) => {
            if (e.key === "Enter") click();
          }}
          autoFocus
        />
        <button onClick={click}>
          <Check size={20} />
        </button>
      </div>
    );
  } else {
    return (
      <div className="bt group flex gap-2">
        <p className={cn(pend ? "animate-pulse text-green-400" : null)}>
          {!pend ? titre : val}
        </p>
        <button
          onClick={() => {
            setedit(true);
          }}
          className="opacity-0  group-hover:opacity-100"
        >
          <Edit size={20} />
        </button>
      </div>
    );
  }
}
