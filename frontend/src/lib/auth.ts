import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthOptions } from "next-auth";
import { db } from "@/db";
import { env } from "@/env";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  session: {
    strategy: "database", // Standard NextAuth database sessions
  },
  providers: [
    {
      id: "riot",
      name: "Riot Games",
      type: "oauth",
      clientId: process.env.RIOT_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.RIOT_CLIENT_SECRET || "mock-client-secret",
      authorization: {
        url: "https://auth.riotgames.com/authorize",
        params: { scope: "openid email profile" },
      },
      token: "https://auth.riotgames.com/token",
      userinfo: "https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/me",
      profile(profile: any) {
        return {
          id: profile.puuid || profile.sub,
          name: profile.gameName && profile.tagLine ? `${profile.gameName}#${profile.tagLine}` : profile.name,
          email: profile.email,
          image: null,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).role = (user as any).role;
        (session.user as any).riotId = (user as any).riotId;
      }
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};
