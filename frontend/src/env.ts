import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    RIOT_API_KEY: z.string().min(1).optional(),
    STRIPE_SECRET_KEY: z.string().min(1).optional(),
    DATABASE_URL: z.string().url().optional(),
    TURSO_DB_TOKEN: z.string().min(1).optional(),
    NEXTAUTH_SECRET: z.string().min(1).optional(),
    BACKEND_API_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_REVERB_APP_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_REVERB_HOST: z.string().min(1).optional(),
    NEXT_PUBLIC_REVERB_PORT: z.string().min(1).optional(),
    NEXT_PUBLIC_REVERB_SCHEME: z.enum(["http", "https"]).default("https"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    RIOT_API_KEY: process.env.RIOT_API_KEY,
    STRIPE_SECRET_KEY:
      process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_TESTING,
    DATABASE_URL: process.env.DATABASE_URL || process.env.TURSO_DB_URL,
    TURSO_DB_TOKEN: process.env.TURSO_DB_TOKEN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_REVERB_APP_KEY: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    NEXT_PUBLIC_REVERB_HOST: process.env.NEXT_PUBLIC_REVERB_HOST,
    NEXT_PUBLIC_REVERB_PORT: process.env.NEXT_PUBLIC_REVERB_PORT,
    NEXT_PUBLIC_REVERB_SCHEME: process.env.NEXT_PUBLIC_REVERB_SCHEME,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
