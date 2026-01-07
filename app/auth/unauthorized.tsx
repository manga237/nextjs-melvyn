import { Alert, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  return (
    <div>
      <Alert>
        <AlertTitle>you need to be logged to see this page</AlertTitle>
      </Alert>
    </div>
  );
}
