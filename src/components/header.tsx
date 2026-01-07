import { getUSer } from "@/lib/auth-server";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { refresh } from "next/cache";

export const Header = () => {
  return (
    <header className="flex items-center gap-4 px-4 border-b  py-2 max-w-xl mx-auto border-x">
      <Link href={"/"}>App</Link>
      <div className="flex-1"></div>
      <Suspense fallback={<Skeleton className="h-10 w-20"></Skeleton>}>
        <AuthButton />
      </Suspense>
    </header>
  );
};

export const AuthButton = async () => {
  const user = await getUSer();

  if (!user) {
    return (
      <Button variant={"outline"} className="">
        <Link href={"/auth/signin"}>Sign In</Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="p-5">
          <Avatar className="size-8 ">
            {user.image ? <AvatarImage src={user.image} /> : null}

            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p>{user.name.toUpperCase()}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={"/auth"}>
            <User2 /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form action="">
            <button
              className="flex gap-3"
              formAction={async () => {
                "use server";
                await auth.api.signOut({ headers: await headers() });
                refresh();
                redirect("/auth/signin");
              }}
            >
              <LogOut className="inline" size={6} />
              logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
