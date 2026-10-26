"use client";
import { useState } from "react";
import { EventItem } from "@/lib/events";
import { deleteEvent } from "./actions";

export default function EventTable({ initialEvents }: { initialEvents: EventItem[] }) {
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    async function handleDelete(id: number) {
        setConfirmDelete(id);
        try {
            await deleteEvent(id);
        } catch (e) {
            console.error(e);
            alert("Failed to delete event.");
        } finally {
            setConfirmDelete(null);
        }
    }

    return (
        <div className="overflow-x-auto border border-[#eaeaea] mb-12">
            <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-50 uppercase text-[10px] tracking-widest text-gray-500 border-b">
                    <tr>
                        <th className="p-4 font-medium">Title</th>
                        <th className="p-4 font-medium">Date / Time</th>
                        <th className="p-4 font-medium">Venue</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeaea]">
                    {initialEvents.length === 0 ? (
                        <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">No events.</td></tr>
                    ) : initialEvents.map((e) => (
                        <tr key={e.id} className="hover:bg-gray-50">
                            <td className="p-4">{e.title}</td>
                            <td className="p-4 whitespace-nowrap">{e.date_text} {e.time_text}</td>
                            <td className="p-4">{e.venue}</td>
                            <td className="p-4 text-right">
                                {confirmDelete === e.id ? (
                                    <div className="flex items-center justify-end gap-3">
                                        <span className="text-[10px] uppercase text-gray-500">Sure?</span>
                                        <button onClick={() => handleDelete(e.id)} className="text-red-600 text-xs font-bold uppercase">Yes</button>
                                        <button onClick={() => setConfirmDelete(null)} className="text-gray-400 text-xs font-bold uppercase">No</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setConfirmDelete(e.id)} className="text-gray-300 hover:text-red-600" title="Delete">✕</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
