"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";

export default function LoginForm() {
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await loginAdmin(password, rememberMe);
            if (result && !result.success) {
                setError(result.error || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6 font-inter">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <p className="font-josefin text-sm tracking-[0.4em] uppercase mb-2">Opera Carmel</p>
                    <h1 className="text-3xl font-normal uppercase tracking-widest">Admin Login</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest mb-2 text-gray-500">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 border-black accent-black"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">
                            Remember this machine
                        </label>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 px-8 uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors disabled:bg-gray-400 font-josefin"
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
