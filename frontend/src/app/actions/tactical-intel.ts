"use server";

import { env } from "@/env";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface TacticalIntelResponse {
  identity: {
    gameName: string;
    tagLine: string;
    puuid: string;
  };
  rank_intel: Array<{
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    queueType: string;
  }>;
  recent_operations: string[];
  timestamp: string;
  status: string;
}

export async function fetchTacticalIntel(): Promise<
  TacticalIntelResponse | { error: string }
> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { error: "UNAUTHORIZED_ACCESS" };
    }

    const riotId = session.user.riotId;
    if (!riotId) {
      return { error: "NO_RIOT_ID_LINKED" };
    }

    const backendUrl = env.BACKEND_API_URL || "http://localhost:80";

    const response = await fetch(
      `${backendUrl}/api/riot/intel?riotId=${encodeURIComponent(riotId)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Cache data at Edge for 5 minutes
      },
    );

    if (!response.ok) {
      if (process.env.NODE_ENV === "production") {
        const errData = await response.json().catch(() => ({}));
        return { error: errData.error || "SIGNAL_LOST_FROM_COMMAND" };
      }
      console.warn(
        "Backend returned error status. Falling back to mock tactical intel data.",
      );
      return getMockTacticalIntel();
    }

    const data = await response.json();
    return data as TacticalIntelResponse;
  } catch (error: any) {
    if (process.env.NODE_ENV === "production") {
      console.error("Failed to fetch Tactical Intel:", error);
      return { error: "INTERNAL_SYSTEM_FAILURE" };
    }
    console.warn(
      "Failed to fetch Tactical Intel. Falling back to mock data.",
      error,
    );
    return getMockTacticalIntel();
  }
}

function getMockTacticalIntel(): TacticalIntelResponse {
  return {
    identity: {
      gameName: "JanuszTFT",
      tagLine: "EUW",
      puuid: "mock-puuid-12345",
    },
    rank_intel: [
      {
        tier: "DIAMOND",
        rank: "II",
        leaguePoints: 45,
        wins: 96,
        losses: 84,
        queueType: "RANKED_TFT",
      },
    ],
    recent_operations: [
      "Operation: Top 1 - Fast 8 Flex (Portal Comp)",
      "Operation: Top 3 - Econ Pivot (Multistriker)",
      "Operation: Top 2 - Hyperroll (Honeymancy)",
    ],
    timestamp: new Date().toISOString(),
    status: "ONLINE",
  };
}
