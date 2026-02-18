"use client";

import { useState, useTransition } from "react";
import { joinLeague } from "./actions";

export default function JoinLeagueForm({ initialJoined }: { initialJoined: boolean }) {
    const [joined, setJoined] = useState(initialJoined);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        startTransition(async () => {
            const result = await joinLeague(formData);
            if (result.success) {
                setJoined(true);
            } else {
                setError(result.error || "An error occurred");
            }
        });
    }

    if (joined) {
        return (
            <div className="text-center p-8 border border-[#eaeaea] rounded-sm">
                <h2 className="text-2xl mb-4 uppercase tracking-widest">Welcome to the League</h2>
                <p className="font-inter font-light italic">
                    Thank you for demonstrating your support. We will be in touch as plans take shape.
                </p>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto text-left">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="uppercase text-xs tracking-widest font-inter">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="location" className="uppercase text-xs tracking-widest font-inter">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    className="border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent"
                    placeholder="Where are you based?"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="uppercase text-xs tracking-widest font-inter">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="flex items-center gap-3 mt-2">
                <input
                    type="checkbox"
                    id="opt_in"
                    name="opt_in"
                    className="w-4 h-4 border-black accent-black"
                    defaultChecked
                />
                <label htmlFor="opt_in" className="text-sm font-inter text-gray-700">
                    I’d like to receive updates on plans as they take shape.
                </label>
            </div>
            {error && <p className="text-sm text-red-500 font-inter">{error}</p>}
            <button
                type="submit"
                disabled={isPending}
                className="bg-black text-white py-4 px-8 uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors disabled:bg-gray-400 font-josefin mt-4"
            >
                {isPending ? "Joining..." : "Join the League!"}
            </button>
            <p className="text-[10px] text-center font-inter text-gray-500 uppercase tracking-widest mt-2">
                Participation is free and carries no obligation
            </p>
        </form>
    );
}
