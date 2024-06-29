import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  facebookSignInFunc,
  githubSignInFunc,
  googleSignInFunc,
  loginFunc,
} from "@/actions/user";
import { Button } from "@/components/ui/button";
// import { getSession } from "@/lib/getSession";
type Props = {};

export default function Login({}: Props) {
  // const session = await getSession();
  // const user = session?.user;
  // if (user) redirect("/");
  return (
    <>
      <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
        <form className="my-8" action={loginFunc}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
          />

          <Label htmlFor="email">Password</Label>
          <Input
            id="password"
            placeholder="*************"
            type="password"
            name="password"
            className="mb-6"
          />

          <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
            Login &rarr;
          </button>

          <p className="text-right text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
            Dont have account? <Link href="/register">Register</Link>
          </p>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
        <div className="flex justify-between">
          <form action={githubSignInFunc}>
            <Button variant={"social"} type="submit">
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Github
              </span>
            </Button>
          </form>
          <form action={googleSignInFunc}>
            <Button variant={"social"} type="submit">
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
            </Button>
          </form>
          <form action={facebookSignInFunc}>
            <Button variant={"social"} type="submit">
              <IconBrandFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                facebook
              </span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
