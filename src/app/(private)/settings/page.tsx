import { fetchAllUSer } from "@/actions/user";
import getSession from "@/lib/get-session";
import User from "@/models/user.model";
import { User as AuthUser } from "next-auth";
import { redirect } from "next/navigation";
type Props = {};

export default async function Settings({}: Props) {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/login");

  if (user?.role !== "admin") return redirect("/private/dashboard");

  const allUsers: any = await fetchAllUSer();
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">users</h1>
        <table className="w-full rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {allUsers?.map((user: AuthUser) => (
              <tr key={user._id}>
                <td className="p-2">{user?.firstname}</td>
                <td className="p-2">{user?.lastname}</td>
                <td className="p-2">
                  <form
                    action={async () => {
                      "use server";
                      await User?.findByIdAndDelete(user._id);
                    }}
                  >
                    <button
                      disabled={user.role === "admin" && false}
                      className="px-2 py-1 text-red-500 hover:bg-red-100 rounded focus:outline-none"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
