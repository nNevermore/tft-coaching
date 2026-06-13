"use server";

import { db } from "@/db";
import { availability, specialists } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleAvailabilitySlot(startTime: Date, endTime: Date) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "coach") {
      return { error: "UNAUTHORIZED_COMMAND" };
    }

    // 1. Find specialist ID
    const specialist = await db.query.specialists.findFirst({
      where: eq(specialists.userId, (session.user as any).id),
    });

    if (!specialist) {
      return { error: "SPECIALIST_NOT_FOUND" };
    }

    // 2. Check if slot exists
    const existing = await db.query.availability.findFirst({
      where: and(
        eq(availability.specialistId, specialist.id),
        eq(availability.startTime, startTime),
      ),
    });

    if (existing) {
      // Remove slot if it exists and is not booked
      if (existing.isBooked) return { error: "SLOT_ALREADY_BOOKED" };
      await db.delete(availability).where(eq(availability.id, existing.id));
    } else {
      // Create new availability slot
      await db.insert(availability).values({
        specialistId: specialist.id,
        startTime,
        endTime,
        isBooked: false,
      });
    }

    revalidatePath("/dashboard/coach/schedule");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle slot:", error);
    return { error: "SYSTEM_FAILURE" };
  }
}

export async function getCoachAvailability() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return [];

    const specialist = await db.query.specialists.findFirst({
      where: eq(specialists.userId, (session.user as any).id),
    });

    if (!specialist) return [];

    return await db.query.availability.findMany({
      where: eq(availability.specialistId, specialist.id),
    });
  } catch (error) {
    return [];
  }
}
