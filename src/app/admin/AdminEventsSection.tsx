import { fetchEvents } from "@/lib/events";
import EventRow from "./EventRow";
import EventForm from "./EventForm";

export default async function AdminEventsSection() {
    const events = await fetchEvents();
    return (
        <section className="mb-16">
            <h2 className="text-xl font-normal uppercase tracking-[0.15em] mb-6">Events</h2>
            <EventForm />
            <div>
                {events.map((e) => (
                    <EventRow key={e.id} event={e} />
                ))}
                {events.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No events yet.</p>
                )}
            </div>
        </section>
    );
}
