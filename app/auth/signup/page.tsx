import PageLayout from "@/components/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "./signup-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un Compte</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Avez-vous déjà un compte ?{" "}
          <Link className="text-blue-500" href={"/auth/signin"}>
            Se Connecter
          </Link>{" "}
        </p>
      </CardFooter>
    </Card>
  );
}
