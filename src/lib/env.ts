import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGO_DB_URI: z.string().url(),
    AUTH_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: z.string().min(1),
    NEXT_PUBLIC_GITHUB_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET: z.string().min(1),
    NEXT_PUBLIC_FACEBOOK_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: z.string().min(1),
  },
  runtimeEnv: {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.AUTH_GITHUB_SECRET,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_ID,
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_SECRET,
    NEXT_PUBLIC_FACEBOOK_CLIENT_ID: process.env.AUTH_FACEBOOK_ID,
    NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: process.env.AUTH_FACEBOOK_SECRET,
  },
});
