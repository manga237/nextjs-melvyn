"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

type provider_type = Parameters<typeof signIn.social>[0]["provider"];

export function SignInForm() {
  // 1. Define your form.
  const [pend, start] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const r = useRouter();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    start(async () => {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            r.push("/auth");
            r.refresh();
          },
          onError(error) {
            toast.error(error.error.message);
          },
        }
      );
    });
  }
  async function SignInWithProvider(provider: provider_type) {
    await signIn.social(
      {
        provider: provider,
        callbackURL: "/auth",
      },
      {
        onError(error) {
          toast.error(error.error.message);
        },
      }
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Entrer votre E-Mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-3">
                  <FormLabel>Mot de Passe</FormLabel>
                  <p>|</p>
                  <Link
                    className="text-indigo-500 text-sm"
                    href={"/auth/forget"}
                  >
                    Forget Password
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Entrer votre mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pend} className="w-full mt-2 p-5" type="submit">
            {pend ? "loading..." : " Submit"}
          </Button>
        </form>
      </Form>
      <p>Or</p>
      <Button
        onClick={() => {
          SignInWithProvider("github");
        }}
        variant={"outline"}
        className="w-full p-5"
      >
        <Github /> Se Connecter avec Github
      </Button>
    </div>
  );
}
