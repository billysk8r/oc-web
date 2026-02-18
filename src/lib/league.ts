import { cookies } from "next/headers";

export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getDb() {
    // Use dynamic import to avoid bundling issues with @opennextjs/cloudflare in some environments
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext();
    const db = (env as any).DATABASE;
    if (!db) {
        throw new Error("DATABASE binding not found");
    }
    return db;
}

export async function fetchAllSignups() {
    try {
        const db = await getDb();
        const { results } = await db.prepare("SELECT * FROM league_members ORDER BY joined_at DESC").all();
        return results;
    } catch (error) {
        console.error("Failed to fetch signups:", error);
        return [];
    }
}

export async function isAdminPasswordSet() {
    try {
        const db = await getDb();
        const result = await db.prepare("SELECT value FROM admin_settings WHERE key = 'admin_password'").first();
        return !!result;
    } catch (error) {
        console.error("Failed to check if admin password is set:", error);
        return false;
    }
}

export async function verifyAdminPassword(password: string) {
    try {
        const db = await getDb();
        const result = (await db.prepare("SELECT value FROM admin_settings WHERE key = 'admin_password'").first()) as { value: string } | null;
        if (!result) return false;

        const hashed = await hashPassword(password);
        return hashed === result.value;
    } catch (error) {
        console.error("Failed to verify admin password:", error);
        return false;
    }
}

export async function createAdminSession(rememberMe: boolean) {
    const cookieStore = await cookies();
    const expires = rememberMe ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10) : undefined; // 10 years or session

    cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires,
    });
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "authenticated";
}
