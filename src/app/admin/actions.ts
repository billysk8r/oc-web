"use server";

import { hashPassword, getDb, createAdminSession, verifyAdminPassword, isAdminPasswordSet } from "@/lib/league";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function setupAdminPassword(password: string) {
    // Safety check: only allow if not already set
    const alreadySet = await isAdminPasswordSet();
    if (alreadySet) {
        return { success: false, error: "Admin password already set" };
    }

    const db = await getDb();
    const hashed = await hashPassword(password);

    await db.prepare("INSERT INTO admin_settings (key, value) VALUES ('admin_password', ?)").bind(hashed).run();

    await createAdminSession(false); // Default to session only for setup
    revalidatePath("/admin");
    return { success: true };
}

export async function loginAdmin(password: string, rememberMe: boolean) {
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
        return { success: false, error: "Invalid password" };
    }

    await createAdminSession(rememberMe);
    revalidatePath("/admin");
    return { success: true };
}

export async function logoutAdmin() {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin");
}

export async function deleteEvent(id: number) {
    const { isAuthenticated, getDb } = await import("@/lib/league");
    const auth = await isAuthenticated();
    if (!auth) throw new Error("Unauthorized");
    const db = await getDb();
    await db.prepare("DELETE FROM events WHERE id = ?").bind(id).run();
    revalidatePath("/admin");
    return { success: true };
}

export async function createEvent(formData: FormData) {
    const { isAuthenticated, getDb } = await import("@/lib/league");
    const auth = await isAuthenticated();
    if (!auth) throw new Error("Unauthorized");
    const db = await getDb();
    await db.prepare("INSERT INTO events (title, date_text, time_text, venue, description, ticket_link) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(
            formData.get("title") as string,
            formData.get("date_text") as string,
            formData.get("time_text") as string,
            formData.get("venue") as string,
            formData.get("description") as string,
            formData.get("ticket_link") as string,
        ).run();
    revalidatePath("/admin");
    return { success: true };
}

export async function updateEvent(id: number, formData: FormData) {
    const { isAuthenticated, getDb } = await import("@/lib/league");
    const auth = await isAuthenticated();
    if (!auth) throw new Error("Unauthorized");
    const db = await getDb();
    await db.prepare("UPDATE events SET title = ?, date_text = ?, time_text = ?, venue = ?, description = ?, ticket_link = ? WHERE id = ?")
        .bind(
            formData.get("title") as string,
            formData.get("date_text") as string,
            formData.get("time_text") as string,
            formData.get("venue") as string,
            formData.get("description") as string,
            formData.get("ticket_link") as string,
            id,
        ).run();
    revalidatePath("/admin");
    return { success: true };
}

export async function deleteSignup(id: number) {
    const { isAuthenticated, getDb } = await import("@/lib/league");

    const auth = await isAuthenticated();
    if (!auth) {
        throw new Error("Unauthorized");
    }

    const db = await getDb();
    await db.prepare("DELETE FROM league_members WHERE id = ?").bind(id).run();

    revalidatePath("/admin");
    return { success: true };
}
