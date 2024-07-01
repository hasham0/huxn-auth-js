import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      role: string;
    } & DefaultSession["User"];
  }

  interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }
}
