"use server";

import { hashPassword, getDb, createAdminSession, verifyAdminPassword, isAdminPasswordSet } from "@/lib/league";
import { redirect } from "next/navigation";

export async function setupAdminPassword(password: string) {
    // Safety check: only allow if not already set
    const alreadySet = await isAdminPasswordSet();
    if (alreadySet) {
        throw new Error("Admin password already set");
    }

    const db = await getDb();
    const hashed = await hashPassword(password);

    await db.prepare("INSERT INTO admin_settings (key, value) VALUES ('admin_password', ?)").bind(hashed).run();

    await createAdminSession(false); // Default to session only for setup
    redirect("/admin");
}

export async function loginAdmin(password: string, rememberMe: boolean) {
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
        return { success: false, error: "Invalid password" };
    }

    await createAdminSession(rememberMe);
    redirect("/admin");
}

export async function logoutAdmin() {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin");
}

export async function deleteSignup(id: number) {
    const { isAuthenticated, getDb } = await import("@/lib/league");
    const { revalidatePath } = await import("next/cache");

    const auth = await isAuthenticated();
    if (!auth) {
        throw new Error("Unauthorized");
    }

    const db = await getDb();
    await db.prepare("DELETE FROM league_members WHERE id = ?").bind(id).run();

    revalidatePath("/admin");
    return { success: true };
}
