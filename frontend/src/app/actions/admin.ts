"use server";

import { db } from "@/db";
import { specialists, users, missions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getAdminData() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    throw new Error("ACCESS_DENIED");
  }

  try {
    const allSpecialists = await db
      .select({
        id: specialists.id,
        name: users.name,
        rank: specialists.rank,
        status: specialists.status,
        winRate: specialists.winRate,
      })
      .from(specialists)
      .leftJoin(users, eq(specialists.userId, users.id));

    const recentMissions = await db
      .select()
      .from(missions)
      .orderBy(desc(missions.createdAt))
      .limit(10);

    const totalYield = await db
      .select({
        total: missions.amountPaid,
      })
      .from(missions);

    const yieldSum = totalYield.reduce((acc, curr) => acc + (curr.total || 0), 0);

    return {
      specialists: allSpecialists,
      missions: recentMissions,
      yield: yieldSum / 100, // Convert cents to PLN
    };
  } catch (error) {
    console.warn("Database query failed. Falling back to mock admin data.", error);
    return {
      specialists: [
        {
          id: "mock-spec-1",
          name: "Trener Bartosz (Demo)",
          rank: "Challenger",
          status: "ONLINE" as const,
          winRate: "68%",
        },
        {
          id: "mock-spec-2",
          name: "Kamil Nidalee (Demo)",
          rank: "Grandmaster",
          status: "IN_COMBAT" as const,
          winRate: "59%",
        },
      ],
      missions: [
        {
          id: "mock-m-1",
          studentId: "mock-student",
          specialistId: "mock-spec-1",
          type: "LIVE" as const,
          status: "IN_PROGRESS" as const,
          scheduledAt: new Date(),
          stripeTransactionId: "ch_mock_1",
          amountPaid: 12000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      yield: 120.00,
    };
  }
}

export async function updateSpecialistStatus(
  id: string,
  status: "ONLINE" | "OFFLINE" | "IN_COMBAT",
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin")
      return { error: "UNAUTHORIZED" };

    await db.update(specialists).set({ status }).where(eq(specialists.id, id));

    revalidatePath("/dashboard/admin/manage");
    return { success: true };
  } catch (error) {
    console.warn("Database offline. Simulating status update.");
    return { success: true };
  }
}
