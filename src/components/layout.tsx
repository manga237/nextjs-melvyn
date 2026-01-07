import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type prop = ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
};
export default function PageLayout({ children, className }: prop) {
  return (
    <div
      className={
        `flex flex-col p-4 gap-4 max-w-xl mx-auto min-h-full border-x ` +
        className
      }
    >
      {children}
    </div>
  );
}
