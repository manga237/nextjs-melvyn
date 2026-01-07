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
import { authClient, signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
});

type provider_type = Parameters<typeof signIn.social>[0]["provider"];

export function AccountForm({
  defaultvalues,
}: {
  defaultvalues: z.infer<typeof formSchema>;
}) {
  // 1. Define your form.
  const [pend, start] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultvalues,
  });
  const r = useRouter();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    start(async () => {
      await authClient.updateUser(
        {
          name: values.name,
          image: values.image,
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

  return (
    <div className="flex flex-col items-center gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom </FormLabel>
                <FormControl>
                  <Input placeholder="Entrer votre " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    value={field.value ?? ""}
                    placeholder="Entrer votre mot de passe"
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
    </div>
  );
}
