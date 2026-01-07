"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { safeaction, sharelink } from "./formul";
import { ComponentProps, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { formSchema } from "./review-schema";

export default function ReviewForm({
  userid,
  redirect,
}: {
  userid?: string;
  redirect?: string;
}) {
  //export default function ReviewForm() {
  //const [state, formaction] = useActionState(formul, {});
  const r = useRouter();

  const { execute } = useAction(sharelink);

  const { executeAsync, result, hasSucceeded, hasErrored } = useAction(
    safeaction,
    {
      onSuccess: () => {
        toast.success(`review created :${result.data!.name}`);
      },
    }
  );

  /*   const update = async (obj: { name: string; review: string }) => {
    const result = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(obj),
    }).then((res) => res.json());
    console.log({ result });
    r.refresh();
  }; */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    form.reset();
    if (userid && redirect) {
      execute({ ...data, userid: userid });
      r.push(redirect);
    } else {
      await executeAsync(data);
      r.refresh();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Submit type="submit">Submit</Submit>
      </form>

      {/* <form
        action={async (formdata) => {
          const nom = formdata.get("nom") as string;
          const rev = formdata.get("review") as string;
          await update({ name: nom, review: rev });
        }}
        className="flex flex-col gap-4"
      >
        <label htmlFor="name">Nom</label>
        <Input type="text" name="nom" id="name" />
        <label htmlFor="review">Review</label>
        <Textarea name="review" id="review" />
        <Submit type="submit">submit</Submit>
        {hasSucceeded ? (
          <p className="text-md text-green-300">success</p>
        ) : hasErrored ? (
          <p className="text-md text-red-400">{result.serverError}</p>
        ) : null}
        {/* <p>{state.error ? state.error : state.message} </p> 
      </form> */}
    </Form>
  );
}

const Submit = (prop: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return <Button disabled={pending || prop.disabled} {...prop}></Button>;
};
