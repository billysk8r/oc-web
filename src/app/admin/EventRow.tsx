"use client";
import { useState, useEffect } from "react";
import { EventItem } from "@/lib/events";
import { deleteEvent, updateEvent } from "./actions";

export default function EventRow({ event }: { event: EventItem }) {
    const [values, setValues] = useState({
        title: event.title,
        date_text: event.date_text,
        time_text: event.time_text,
        venue: event.venue,
        description: event.description,
        ticket_link: event.ticket_link,
    });
    const [changed, setChanged] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        const isDifferent =
            values.title !== event.title ||
            values.date_text !== event.date_text ||
            values.time_text !== event.time_text ||
            values.venue !== event.venue ||
            values.description !== event.description ||
            values.ticket_link !== event.ticket_link;
        setChanged(isDifferent);
    }, [values, event]);

    async function handleSave() {
        setSaving(true);
        setStatus("Saving...");
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("date_text", values.date_text);
            formData.append("time_text", values.time_text);
            formData.append("venue", values.venue);
            formData.append("description", values.description);
            formData.append("ticket_link", values.ticket_link);
            await updateEvent(event.id, formData);
            setStatus("Saved.");
            setTimeout(() => setStatus(""), 1500);
        } catch {
            setStatus("Failed.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        await deleteEvent(event.id);
    }

    return (
        <div className="border border-[#eaeaea] p-5 mb-6 bg-white rounded-sm">
            <div className="grid md:grid-cols-3 gap-3 mb-3">
                <input
                    value={values.title}
                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                    className="border border-[#eaeaea] px-3 py-2 text-sm"
                    placeholder="Event title"
                />
                <input
                    value={values.date_text}
                    onChange={(e) => setValues({ ...values, date_text: e.target.value })}
                    className="border border-[#eaeaea] px-3 py-2 text-sm"
                    placeholder="Date (e.g. Sunday, November 15)"
                />
                <input
                    value={values.time_text}
                    onChange={(e) => setValues({ ...values, time_text: e.target.value })}
                    className="border border-[#eaeaea] px-3 py-2 text-sm"
                    placeholder="Time (e.g. 5:30pm)"
                />
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
                <input
                    value={values.venue}
                    onChange={(e) => setValues({ ...values, venue: e.target.value })}
                    className="border border-[#eaeaea] px-3 py-2 text-sm"
                    placeholder="Venue"
                />
                <input
                    value={values.ticket_link}
                    onChange={(e) => setValues({ ...values, ticket_link: e.target.value })}
                    className="border border-[#eaeaea] px-3 py-2 text-sm"
                    placeholder="Ticket link URL"
                />
            </div>
            <textarea
                value={values.description}
                onChange={(e) => setValues({ ...values, description: e.target.value })}
                rows={3}
                className="w-full border border-[#eaeaea] px-3 py-2 text-sm mb-3"
                placeholder="Description"
            />
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    disabled={!changed || saving}
                    className={`px-5 py-2 uppercase text-[10px] tracking-widest font-bold transition-colors ${changed && !saving ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                >
                    {saving ? "Saving..." : "Save changes"}
                </button>
                <span className="text-xs text-gray-500">{status}</span>
                <div className="ml-auto">
                    {deleteConfirm ? (
                        <span className="inline-flex items-center gap-2">
                            <span className="text-[10px] text-gray-500">Sure?</span>
                            <button onClick={handleDelete} className="text-red-600 text-xs font-bold uppercase">Yes</button>
                            <button onClick={() => setDeleteConfirm(false)} className="text-gray-400 text-xs font-bold uppercase">No</button>
                        </span>
                    ) : (
                        <button onClick={() => setDeleteConfirm(true)} className="text-gray-300 hover:text-red-600 text-xs font-bold uppercase">Delete</button>
                    )}
                </div>
            </div>
        </div>
    );
}
