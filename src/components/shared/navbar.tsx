import Link from "next/link";
import { Button } from "../ui/button";
import getSession from "@/lib/get-session";
import { signOut } from "@/lib/auth";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;
  const adminRole = user?.role === "admin";

  return (
    <>
      <nav className="flex justify-around items-center py-4 bg-[#141414] text-white">
        <Link href="/" className="text-xl font-bold">
          My Facny Website
        </Link>

        <ul className="hidden md:flex space-x-4 list-none">
          {!user ? (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-gray-400">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {adminRole && (
                <>
                  <li className="mt-2">
                    <Link href="/dashboard" className="hover:text-gray-400">
                      Dashboard
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="/settings" className="hover:text-gray-400">
                      settings
                    </Link>
                  </li>
                </>
              )}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <Button type="submit" variant={"ghost"}>
                  Logout
                </Button>
              </form>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
