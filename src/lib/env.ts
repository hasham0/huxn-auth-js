import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGO_DB_URI: z.string().url(),
    AUTH_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
});
