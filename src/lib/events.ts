export interface EventItem {
    id: number;
    title: string;
    date_text: string;
    time_text: string;
    venue: string;
    description: string;
    ticket_link: string;
    created_at: string;
}

export async function fetchEvents() {
    try {
        const { getDb } = await import("@/lib/league");
        const db = await getDb();
        const { results } = await db.prepare("SELECT * FROM events ORDER BY created_at DESC").all<EventItem>();
        return results || [];
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return [];
    }
}
