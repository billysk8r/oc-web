import ShareButton from "./ShareButton";

export default function ThankYouPage() {
    return (
        <div className="flex flex-col items-center min-h-screen p-5 py-20 text-center bg-white text-black font-inter">
            <div className="max-w-[700px] w-full flex flex-col gap-12 items-center">
                <header className="flex flex-col gap-4 items-center">
                    <p className="font-josefin text-sm tracking-[0.4em] uppercase mb-2">Opera Carmel</p>
                    <h1 className="font-normal text-[clamp(2rem,6vw,3.5rem)] tracking-[0.1em] uppercase leading-tight">
                        Welcome to the League
                    </h1>
                    <div className="w-16 h-[1px] bg-black mt-4"></div>
                </header>

                <section className="font-light text-[1.1rem] leading-relaxed text-gray-800 flex flex-col gap-6 text-center">
                    <p className="italic text-lg">Thank you for your support.</p>
                    <p>
                        Your name helps show that there is real demand for opera on the Central Coast.
                        Please share this with anyone else who might be interested.
                    </p>
                </section>

                <ShareButton />

                <footer className="mt-12 w-full pt-8 border-t border-[#eaeaea]">
                    <p className="font-inter text-xs tracking-[0.2em] uppercase text-gray-500">
                        Opera Carmel · A new resident opera company
                    </p>
                </footer>
            </div>
        </div>
    );
}
