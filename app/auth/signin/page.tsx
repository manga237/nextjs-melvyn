import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SignUpForm } from "../signup/signup-form";
import Link from "next/link";
import { SignInForm } from "./signin-form";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Se Connecter</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          vous n'avez pas de compte ?{" "}
          <Link className="text-blue-500" href={"/auth/signup"}>
            Créer un compte
          </Link>{" "}
        </p>
      </CardFooter>
    </Card>
  );
}
