"use client";

import { useState } from "react";

export default function ShareButton() {
    const [status, setStatus] = useState<"idle" | "shared" | "copied">("idle");

    const handleShare = async () => {
        const shareData = {
            title: "Opera Carmel League",
            text: "Join the Opera League to support fully staged, professional opera productions on the Monterey Peninsula.",
            url: "https://operacarmel.org/league",
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                setStatus("shared");
                setTimeout(() => setStatus("idle"), 3000);
            } catch (err) {
                // If user cancels or share fails, fallback to clipboard
                if ((err as Error).name !== "AbortError") {
                    fallbackCopy();
                }
            }
        } else {
            fallbackCopy();
        }
    };

    const fallbackCopy = () => {
        navigator.clipboard.writeText("https://operacarmel.org/league").then(() => {
            setStatus("copied");
            setTimeout(() => setStatus("idle"), 3000);
        });
    };

    return (
        <button
            onClick={handleShare}
            className="bg-black text-white py-4 px-8 uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors font-josefin mt-4 min-w-[200px]"
        >
            {status === "idle" && "SHARE THE LEAGUE"}
            {status === "shared" && "SHARED!"}
            {status === "copied" && "LINK COPIED!"}
        </button>
    );
}
