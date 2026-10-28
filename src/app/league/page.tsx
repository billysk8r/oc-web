import JoinLeagueForm from "./JoinLeagueForm";

export const dynamic = "force-dynamic";

export default async function LeaguePage() {
    return (
        <div className="flex flex-col items-center w-full p-5 text-center bg-white text-black font-inter">
            <div className="max-w-[600px] w-full flex-1">
                <h1 className="mb-[10px]">
                    <img src="/OperaCarmel1200x600.png" alt="Opera Carmel" className="mx-auto max-w-[320px] w-full h-auto" />
                </h1>
                <header className="flex flex-col gap-3 mb-8">
                    <h2 className="font-normal text-[clamp(1.5rem,5vw,2.5rem)] tracking-[0.1em] uppercase leading-tight">
                        Join the Opera League
                    </h2>
                    <div className="w-16 h-[1px] bg-black mx-auto mt-2"></div>
                </header>

                <section className="font-light text-[1.1rem] leading-relaxed text-gray-800 flex flex-col gap-6 text-justify">
                    <p className="italic text-center text-lg mb-4">
                        A community of people who believe live opera should have a vibrant home on the Monterey Peninsula.
                    </p>
                    <p className="text-left">
                        Opera Carmel is building the support needed to bring fully staged, professional opera
                        productions to Carmel's main stage. The Opera League is a growing circle of residents, artists,
                        and arts patrons from across the region and beyond who want to see opera thrive here.
                    </p>
                    <p className="text-left">
                        By joining, you help demonstrate meaningful community interest as plans move forward. Your name
                        helps show that there is real demand for opera on the Central Coast.
                    </p>
                    <p className="text-center font-normal tracking-wide mt-4">
                        Participation is free and carries no obligation. It simply signals:{" "}
                        <span className="italic block mt-2 text-xl">&quot;I want opera to exist here.&quot;</span>
                    </p>
                </section>

                <JoinLeagueForm />
            </div>
        </div>
    );
}
