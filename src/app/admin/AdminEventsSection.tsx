import { fetchEvents } from "@/lib/events";
import EventTable from "./EventTable";
import EventForm from "./EventForm";

export default async function AdminEventsSection() {
    const events = await fetchEvents();
    return (
        <section className="mb-16">
            <h2 className="text-xl font-normal uppercase tracking-[0.15em] mb-6">Events</h2>
            <EventForm />
            <EventTable initialEvents={events} />
        </section>
    );
}
