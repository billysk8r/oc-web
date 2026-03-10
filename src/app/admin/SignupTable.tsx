"use client";

import { useState } from "react";
import { Signup } from "@/lib/league";
import { deleteSignup } from "./actions";

export default function SignupTable({ initialSignups }: { initialSignups: Signup[] }) {
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    async function handleDelete(id: number) {
        setIsDeleting(id);
        try {
            await deleteSignup(id);
            // The page will revalidate due to the server action, but for better UX
            // we could also filter the state here if we wanted immediate feedback
            // without waiting for the revalidation. However, startTransition/revalidatePath
            // is the standard Next.js way.
        } catch (error) {
            console.error("Failed to delete signup:", error);
            alert("Failed to delete record. Please try again.");
        } finally {
            setIsDeleting(null);
            setConfirmDelete(null);
        }
    }

    return (
        <div className="overflow-x-auto border border-[#eaeaea]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 uppercase text-[10px] tracking-widest text-gray-500 border-b border-[#eaeaea]">
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Location</th>
                        <th className="p-4 font-medium text-center">Opt-in</th>
                        <th className="p-4 font-medium">Joined At</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeaea]">
                    {initialSignups.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-400 italic">
                                No signups found yet.
                            </td>
                        </tr>
                    ) : (
                        initialSignups.map((signup: Signup) => (
                            <tr key={signup.id} className="hover:bg-gray-50 transition-colors text-sm">
                                <td className="p-4">{signup.name}</td>
                                <td className="p-4">{signup.email}</td>
                                <td className="p-4">{signup.location}</td>
                                <td className="p-4 text-center">{signup.opt_in ? "Yes" : "No"}</td>
                                <td className="p-4 text-gray-500 whitespace-nowrap">
                                    {new Date(signup.joined_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    {confirmDelete === signup.id ? (
                                        <div className="flex items-center justify-end gap-3 animate-in fade-in slide-in-from-right-2 duration-200">
                                            <span className="text-[10px] uppercase tracking-tighter text-gray-500 font-medium">
                                                Are you sure?
                                            </span>
                                            <button
                                                onClick={() => handleDelete(signup.id)}
                                                disabled={isDeleting === signup.id}
                                                className="text-red-600 hover:text-red-800 uppercase text-[10px] tracking-widest font-bold disabled:opacity-50"
                                            >
                                                {isDeleting === signup.id ? "..." : "Yes"}
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                disabled={isDeleting === signup.id}
                                                className="text-gray-400 hover:text-black uppercase text-[10px] tracking-widest font-bold disabled:opacity-50"
                                            >
                                                No
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmDelete(signup.id)}
                                            className="text-gray-300 hover:text-red-600 transition-colors"
                                            title="Delete record"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
