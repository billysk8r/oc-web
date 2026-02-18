import { getLeagueStatus } from "./actions";
import JoinLeagueForm from "./JoinLeagueForm";

export const dynamic = "force-dynamic";

export default async function LeaguePage() {
    const initialJoined = await getLeagueStatus();

    return (
        <div className="flex flex-col items-center min-h-screen p-5 py-20 text-center bg-white text-black font-inter">
            <div className="max-w-[700px] w-full flex flex-col gap-12">
                <header className="flex flex-col gap-4">
                    <p className="font-josefin text-sm tracking-[0.4em] uppercase mb-2">Opera Carmel</p>
                    <h1 className="font-normal text-[clamp(2rem,6vw,3.5rem)] tracking-[0.1em] uppercase leading-tight">
                        Join the Opera League
                    </h1>
                    <div className="w-16 h-[1px] bg-black mx-auto mt-4"></div>
                </header>

                <section className="font-light text-[1.1rem] leading-relaxed text-gray-800 flex flex-col gap-6 text-justify">
                    <p className="italic text-center text-lg mb-4">
                        A community of people who want live opera to be part of Carmel’s cultural life.
                    </p>
                    <p>
                        Opera Carmel is working to bring fully staged opera to Carmel’s main stage. The Opera League is a
                        growing group of residents, artists, and arts patrons who want to see opera thrive locally.
                    </p>
                    <p>
                        By joining, you’re helping demonstrate community interest and staying connected as plans take
                        shape.
                    </p>
                    <p className="text-center font-normal tracking-wide mt-4">
                        Participation is free and carries no obligation — it simply signals:{" "}
                        <span className="italic block mt-2 text-xl">"I want this to exist."</span>
                    </p>
                </section>

                <JoinLeagueForm initialJoined={initialJoined} />

                <footer className="mt-12 pt-8 border-t border-[#eaeaea]">
                    <p className="font-inter text-xs tracking-[0.2em] uppercase text-gray-500">
                        Opera Carmel · A new resident opera company
                    </p>
                </footer>
            </div>
        </div>
    );
}
