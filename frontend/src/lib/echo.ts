import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { env } from "@/env";

// Ensure Pusher is globally available for Echo
if (typeof window !== "undefined") {
  window.Pusher = Pusher;
}

/**
 * Tactical WebSocket Client (Laravel Echo)
 *
 * Configured to connect to Laravel Reverb.
 * Handles encrypted signals and real-time mission updates.
 */
export const echo =
  typeof window !== "undefined"
    ? new Echo({
        broadcaster: "reverb",
        key: env.NEXT_PUBLIC_REVERB_APP_KEY || "reverb_key",
        wsHost: env.NEXT_PUBLIC_REVERB_HOST || "localhost",
        wsPort: env.NEXT_PUBLIC_REVERB_PORT
          ? parseInt(env.NEXT_PUBLIC_REVERB_PORT)
          : 8080,
        wssPort: env.NEXT_PUBLIC_REVERB_PORT
          ? parseInt(env.NEXT_PUBLIC_REVERB_PORT)
          : 8080,
        forceTLS: env.NEXT_PUBLIC_REVERB_SCHEME === "https",
        enabledTransports: ["ws", "wss"],
        // Authentication for private channels
        authorizer: (channel) => {
          return {
            authorize: (socketId, callback) => {
              // We proxy the auth request through our local Next.js API to hide Laravel URL and inject session
              fetch("/api/proxy/broadcasting/auth", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  socket_id: socketId,
                  channel_name: channel.name,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  callback(null, data);
                })
                .catch((error) => {
                  callback(
                    error instanceof Error ? error : new Error(String(error)),
                    null,
                  );
                });
            },
          };
        },
      })
    : null;
