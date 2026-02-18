"use server";

import { cookies } from "next/headers";
import { fetchAllSignups, getDb } from "@/lib/league";

export async function joinLeague(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;
    const opt_in = formData.get("opt_in") === "on";

    const db = await getDb();

    if (!db) {
        console.error("OC_DB binding not found");
        return { success: false, error: "Database binding missing" };
    }

    const cookieStore = await cookies();
    let clientId = cookieStore.get("oc_client_id")?.value;

    if (!clientId) {
        clientId = crypto.randomUUID();
        cookieStore.set("oc_client_id", clientId, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: "/",
        });
    }

    try {
        await db
            .prepare(
                "INSERT INTO league_members (name, email, location, opt_in, client_id) VALUES (?, ?, ?, ?, ?) ON CONFLICT(client_id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, location = EXCLUDED.location, opt_in = EXCLUDED.opt_in",
            )
            .bind(name || null, email || null, location || null, opt_in ? 1 : 0, clientId)
            .run();

        cookieStore.set("oc_league_joined", "true", {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to join league:", error);
        return { success: false, error: "Failed to persist membership" };
    }
}

export async function getLeagueStatus() {
    const cookieStore = await cookies();
    return cookieStore.get("oc_league_joined")?.value === "true";
}

export { fetchAllSignups as getAllSignups };
