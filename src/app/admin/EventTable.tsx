"use client";
import { useState } from "react";
import { EventItem } from "@/lib/events";
import { deleteEvent, updateEvent } from "./actions";

export default function EventTable({ initialEvents }: { initialEvents: EventItem[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<EventItem>>({});
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    function startEdit(event: EventItem) {
        setEditingId(event.id);
        setEditData({ ...event });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditData({});
    }

    async function handleUpdate(id: number) {
        const formData = new FormData();
        formData.append("title", editData.title || "");
        formData.append("date_text", editData.date_text || "");
        formData.append("time_text", editData.time_text || "");
        formData.append("venue", editData.venue || "");
        formData.append("description", editData.description || "");
        formData.append("ticket_link", editData.ticket_link || "");
        await updateEvent(id, formData);
        setEditingId(null);
        setEditData({});
    }

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
                            {editingId === e.id ? (
                                <>
                                    <td className="p-4">
                                        <input value={editData.title || ""} onChange={(ev) => setEditData({ ...editData, title: ev.target.value })} className="w-full border px-2 py-1 text-xs" />
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <input value={editData.date_text || ""} onChange={(ev) => setEditData({ ...editData, date_text: ev.target.value })} className="w-full border px-1 py-1 text-xs" />
                                        <input value={editData.time_text || ""} onChange={(ev) => setEditData({ ...editData, time_text: ev.target.value })} className="w-full border px-1 py-1 text-xs mt-1" />
                                    </td>
                                    <td className="p-4">
                                        <input value={editData.venue || ""} onChange={(ev) => setEditData({ ...editData, venue: ev.target.value })} className="w-full border px-2 py-1 text-xs" />
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleUpdate(e.id)} className="text-green-600 text-xs font-bold uppercase">Save</button>
                                        <button onClick={cancelEdit} className="text-gray-400 text-xs font-bold uppercase">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-4">{e.title}</td>
                                    <td className="p-4 whitespace-nowrap">{e.date_text} {e.time_text}</td>
                                    <td className="p-4">{e.venue}</td>
                                    <td className="p-4 text-right space-x-3">
                                        <button onClick={() => startEdit(e)} className="text-blue-600 text-xs font-bold uppercase hover:underline">Edit</button>
                                        {confirmDelete === e.id ? (
                                            <span className="inline-flex items-center gap-2">
                                                <span className="text-[10px] text-gray-500">Sure?</span>
                                                <button onClick={() => handleDelete(e.id)} className="text-red-600 text-xs font-bold uppercase">Yes</button>
                                                <button onClick={() => setConfirmDelete(null)} className="text-gray-400 text-xs font-bold uppercase">No</button>
                                            </span>
                                        ) : (
                                            <button onClick={() => setConfirmDelete(e.id)} className="text-gray-300 hover:text-red-600" title="Delete">✕</button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
