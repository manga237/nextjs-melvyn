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
import { signUp } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "doit contenir au moins 2 caracteres"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "le mot de passe doit contenir au moins 8 caractères"),
});

export function SignUpForm() {
  // 1. Define your form.
  const [pend, start] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
      await signUp.email(
        {
          name: values.name,
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
            toast(JSON.stringify(error, null, 2));
          },
        }
      );
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="Entrer votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Mot de Passe</FormLabel>
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
          <Button disabled={pend} className="w-full mt-2" type="submit">
            {pend ? "Création en cours..." : " Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
