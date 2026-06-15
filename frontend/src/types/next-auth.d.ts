import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "coach" | "admin";
      riotId: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: "user" | "coach" | "admin";
    riotId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "coach" | "admin";
    riotId?: string | null;
  }
}

import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher?: typeof Pusher;
  }
}
