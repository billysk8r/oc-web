"use client";
import { useState } from "react";
import { createEvent } from "./actions";

export default function EventForm() {
    const [status, setStatus] = useState("");

    async function handleSubmit(formData: FormData) {
        setStatus("Saving...");
        try {
            await createEvent(formData);
            setStatus("Created!");
            (document.getElementById("event-form") as HTMLFormElement)?.reset();
            setTimeout(() => setStatus(""), 2000);
        } catch {
            setStatus("Failed.");
        }
    }

    return (
        <form id="event-form" action={handleSubmit} className="mb-6 space-y-3 text-sm">
            <div className="grid md:grid-cols-3 gap-3">
                <input name="title" placeholder="Event title" required className="border border-[#eaeaea] px-3 py-2" />
                <input name="date_text" placeholder="Date (e.g. Sunday, November 15)" required className="border border-[#eaeaea] px-3 py-2" />
                <input name="time_text" placeholder="Time (e.g. 5:30pm)" required className="border border-[#eaeaea] px-3 py-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
                <input name="venue" placeholder="Venue" className="border border-[#eaeaea] px-3 py-2" />
                <input name="ticket_link" placeholder="Ticket link URL" className="border border-[#eaeaea] px-3 py-2" />
            </div>
            <textarea name="description" placeholder="Description" rows={3} className="w-full border border-[#eaeaea] px-3 py-2" />
            <div className="flex items-center gap-3">
                <button type="submit" className="bg-black text-white px-5 py-2 uppercase text-[10px] tracking-widest hover:bg-gray-800">Add Event</button>
                <span className="text-xs text-gray-500">{status}</span>
            </div>
        </form>
    );
}
