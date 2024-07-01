import {
  facebookSignInFunc,
  githubSignInFunc,
  googleSignInFunc,
  registerFunc,
} from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
// import { getSession } from "@/lib/getSession";
import Link from "next/link";

type Props = {};

export default function Register({}: Props) {
  // const session = await getSession();
  // const user = session?.user;
  // if (user) redirect("/");
  return (
    <>
      <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to MyShop
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please provide all the necessary information
        </p>

        <form className="my-8" action={registerFunc}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <div className="flex flex-col">
              <Label htmlFor="firstname" className="mb-2">
                First Name
              </Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                name="firstname"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="lastname" className="mb-2">
                Last Name
              </Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                name="lastname"
              />
            </div>
          </div>

          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="***********"
            type="password"
            name="password"
            className="mb-5"
          />

          <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
            Sign up &rarr;
          </button>

          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Already have an account? <Link href="/login">Login</Link>
          </p>
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
