import { env } from "@/env";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Tactical Broadcast Auth Proxy
 *
 * Proxies Laravel Echo authorization requests to the Laravel Backend.
 * Injecting the necessary session context to authorize private channels.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "UNAUTHORIZED_SIGNAL" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const backendUrl = env.BACKEND_API_URL || "http://localhost:80";

    // Forward the request to Laravel's broadcasting/auth endpoint
    // In a real setup, you might need to pass a Bearer token or CSRF if using Sanctum
    const response = await fetch(`${backendUrl}/api/broadcasting/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Here we could inject a custom header that Laravel middleware validates
        "X-App-User-Id": session.user.id,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Broadcast Auth Proxy Error:", error);
    return NextResponse.json({ error: "SIGNAL_INTERRUPTED" }, { status: 500 });
  }
}
