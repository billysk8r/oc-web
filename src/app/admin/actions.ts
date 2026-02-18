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
