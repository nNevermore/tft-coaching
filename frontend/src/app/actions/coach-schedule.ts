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
    if (!session || session.user.role !== "coach") {
      return { error: "UNAUTHORIZED_COMMAND" };
    }

    // 1. Find specialist ID
    const specialist = await db.query.specialists.findFirst({
      where: eq(specialists.userId, session.user.id),
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
      where: eq(specialists.userId, session.user.id),
    });

    if (!specialist) {
      if (process.env.NODE_ENV === "production") return [];
      return getMockAvailability();
    }

    return await db.query.availability.findMany({
      where: eq(availability.specialistId, specialist.id),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
    console.warn("Database offline. Falling back to mock coach availability.");
    return getMockAvailability();
  }
}

function getMockAvailability() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return [
    {
      id: "mock-slot-1",
      specialistId: "mock-coach-id",
      startTime: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10:00
      endTime: new Date(today.getTime() + 11 * 60 * 60 * 1000), // 11:00
      isBooked: false,
    },
    {
      id: "mock-slot-2",
      specialistId: "mock-coach-id",
      startTime: new Date(today.getTime() + 14 * 60 * 60 * 1000), // 14:00
      endTime: new Date(today.getTime() + 15 * 60 * 60 * 1000), // 15:00
      isBooked: true,
    },
    {
      id: "mock-slot-3",
      specialistId: "mock-coach-id",
      startTime: new Date(today.getTime() + 86400000 + 11 * 60 * 60 * 1000), // Tomorrow 11:00
      endTime: new Date(today.getTime() + 86400000 + 12 * 60 * 60 * 1000), // Tomorrow 12:00
      isBooked: false,
    },
  ];
}
