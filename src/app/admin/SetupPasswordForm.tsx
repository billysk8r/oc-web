"use client";

import { useState } from "react";
import { setupAdminPassword } from "./actions";

export default function SetupPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);
        try {
            await setupAdminPassword(password);
        } catch (err) {
            setError("Failed to set password. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6 font-inter text-black">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <p className="font-josefin text-sm tracking-[0.4em] uppercase mb-2">Opera Carmel</p>
                    <h1 className="text-3xl font-normal uppercase tracking-widest">Initial Setup</h1>
                    <p className="mt-4 text-gray-500 text-sm italic">Please set your administrator password.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest text-gray-500">
                            Create Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent"
                            placeholder="Minimum 8 characters"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest text-gray-500">
                            Verify Password
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent"
                            placeholder="Re-type your password"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 px-8 uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors disabled:bg-gray-400 font-josefin"
                    >
                        {loading ? "Setting up..." : "Complete Setup"}
                    </button>
                </form>
            </div>
        </div>
    );
}
