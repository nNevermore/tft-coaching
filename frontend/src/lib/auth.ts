import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { env } from "@/env";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  session: {
    strategy: "jwt", // Required for Credentials provider and optimal for edge routing
  },
  providers: [
    CredentialsProvider({
      id: "mock-login",
      name: "Mock Login (Demo)",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "coach@tft-coaching.net" },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        // Mock users for local testing
        if (email === "coach@tft-coaching.net" && password === "coach123") {
          return {
            id: "mock-coach-id",
            name: "Trener Bartosz",
            email: "coach@tft-coaching.net",
            role: "coach",
            riotId: "CoachBartosz#EUNE",
          };
        } else if (email === "student@tft-coaching.net" && password === "student123") {
          return {
            id: "mock-student-id",
            name: "Gracz Janusz",
            email: "student@tft-coaching.net",
            role: "user",
            riotId: "JanuszTFT#EUW",
          };
        } else if (email === "admin@tft-coaching.net" && password === "admin123") {
          return {
            id: "mock-admin-id",
            name: "Admin Bartosz",
            email: "admin@tft-coaching.net",
            role: "admin",
            riotId: "Admin#EUW",
          };
        }

        return null;
      },
    }),
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
          role: "user",
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "user";
        token.riotId = (user as any).riotId || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).riotId = token.riotId;
      }
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};
