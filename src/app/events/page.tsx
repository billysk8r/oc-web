import Link from "next/link";
import { fetchEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
    const events = await fetchEvents();

    return (
        <div className="flex flex-col items-center w-full p-5 text-center bg-white text-black font-inter">
            <div className="max-w-[600px] w-full flex-1">
                <h1 className="mb-[10px]">
                    <img src="/OperaCarmel1200x600.png" alt="Opera Carmel" className="mx-auto max-w-[320px] w-full h-auto" />
                </h1>
                <header className="flex flex-col gap-3 mb-8">
                    <p className="font-light text-[1.15rem] tracking-[0.02em] italic text-[#4a4a4a]">
                        Upcoming Events
                    </p>
                    <div className="w-16 h-[1px] bg-black mx-auto mt-2"></div>
                </header>

                {events.length === 0 ? (
                    <p className="text-gray-500 italic">No events announced yet.</p>
                ) : (
                    <section className="flex flex-col gap-12">
                        {events.map((event) => (
                            <article key={event.id} className="text-left">
                                <h2 className="font-josefin text-xl tracking-[0.15em] uppercase mb-1">{event.title}</h2>
                                <p className="text-sm tracking-[0.15em] uppercase text-gray-500 mb-4">
                                    {event.date_text} | {event.time_text} at {event.venue}
                                </p>
                                <div className="font-light text-[1.05rem] leading-relaxed text-gray-800 whitespace-pre-line mb-6">
                                    {event.description}
                                </div>
                                <Link
                                    href={event.ticket_link}
                                    className="inline-block bg-black text-white py-3 px-8 uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors font-josefin text-sm"
                                >
                                    Get Tickets →
                                </Link>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
