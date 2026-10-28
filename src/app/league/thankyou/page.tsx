import ShareButton from "./ShareButton";

export default function ThankYouPage() {
    return (
        <div className="flex flex-col items-center w-full p-5 text-center bg-white text-black font-inter">
            <div className="max-w-[600px] w-full flex-1">
                <h1 className="mb-[10px]">
                    <img src="/OperaCarmel1200x600.png" alt="Opera Carmel" className="mx-auto max-w-[320px] w-full h-auto" />
                </h1>
                <header className="flex flex-col gap-3 mb-8">
                    <h2 className="font-normal text-xl tracking-[0.1em] uppercase leading-tight">
                        Welcome to the League
                    </h2>
                    <div className="w-16 h-[1px] bg-black mx-auto mt-2"></div>
                </header>

                <section className="font-light text-[1.1rem] leading-relaxed text-gray-800 flex flex-col gap-6 text-center">
                    <p className="italic text-lg">Thank you for your support.</p>
                    <p>
                        Your name helps show that there is real demand for opera on the Central Coast.
                        Please share this with anyone else who might be interested.
                    </p>
                </section>

                <ShareButton />
            </div>
        </div>
    );
}
