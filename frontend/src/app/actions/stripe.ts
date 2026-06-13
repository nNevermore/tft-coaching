"use server";

import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { env } from "@/env";
import { headers } from "next/headers";

const stripe = new Stripe(env.STRIPE_SECRET_KEY || "");

export async function createCheckoutSession(type: "live" | "vod") {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Musisz być zalogowany, aby dokonać zakupu.");
  }

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  if (!env.STRIPE_SECRET_KEY) {
    console.warn("Brak STRIPE_SECRET_KEY. Uruchamiam proces płatności testowej (Mock Payment Mode).");
    return { url: `${baseUrl}/dashboard/lessons?success=true` };
  }

  const priceData = {
    live: {
      name: "Live Coaching Session (1 Godzina)",
      amount: 12000, // 120.00 PLN in cents
    },
    vod: {
      name: "Analiza Nagrania VOD",
      amount: 8000, // 80.00 PLN in cents
    },
  }[type];

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: priceData.name,
              description:
                type === "live"
                  ? "Sesja coachingowa na żywo 1-na-1 z analizą rozgrywki na Discordzie."
                  : "Szczegółowa analiza wideo przesłanego nagrania z Twojej gry.",
            },
            unit_amount: priceData.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/dashboard/lessons?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard/book?cancelled=true`,
      metadata: {
        userId: (session.user as any).id,
        bookingType: type,
      },
    });

    if (!checkoutSession.url) {
      throw new Error("Nie udało się wygenerować adresu płatności.");
    }

    return { url: checkoutSession.url };
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    throw new Error(
      error.message || "Wystąpił nieoczekiwany błąd płatności Stripe.",
    );
  }
}
