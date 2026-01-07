"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function Error() {
  return (
    <div>
      <Alert>
        <TriangleAlert size={16} />
        <AlertTitle>Videos introuvable desole</AlertTitle>
      </Alert>
    </div>
  );
}
