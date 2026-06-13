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
}

export async function updateSpecialistStatus(
  id: string,
  status: "ONLINE" | "OFFLINE" | "IN_COMBAT",
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin")
    return { error: "UNAUTHORIZED" };

  await db.update(specialists).set({ status }).where(eq(specialists.id, id));

  revalidatePath("/dashboard/admin/manage");
  return { success: true };
}
