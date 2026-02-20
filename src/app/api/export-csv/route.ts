import { NextResponse } from "next/server";
import { Signup, fetchAllSignups } from "../../../lib/league";

export async function GET() {
    try {
        const signups = await fetchAllSignups();

        const headers = ["ID", "Name", "Email", "Location", "Opt-in", "Joined At", "Client ID"];
        const rows = signups.map((s: Signup) => [
            s.id,
            s.name,
            s.email,
            s.location,
            s.opt_in ? "Yes" : "No",
            s.joined_at,
            s.client_id,
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(","))
            .join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="opera-league-signups-${new Date().toISOString().split("T")[0]}.csv"`,
            },
        });
    } catch (error) {
        console.error("CSV Export failed:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
