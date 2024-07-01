import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import bcryptjs from "bcryptjs";
import dbConnection from "@/db/dbConnect";
import User from "@/models/user.model";
import { env } from "./env";
import NextAuth, {
  AuthError,
  CredentialsSignin,
  User as authUser,
} from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
    Facebook({
      clientId: env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<authUser> => {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            throw new Error("please provide both email and password");
          }

          await dbConnection();

          const user = await User.findOne({ email }).select("+password +role");

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          const isPasswordMatch = await bcryptjs.compare(
            password as string,
            user.password
          );

          if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
          }
          return {
            _id: user._id as string,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          const err = (error as { message: string }).message;
          throw new AuthError(err, {});
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: env.AUTH_SECRET,
});
