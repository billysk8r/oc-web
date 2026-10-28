import FlodeskForm from "@/components/FlodeskForm";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full p-5 text-center bg-white text-black font-inter">
            <div className="max-w-[600px] w-full flex-1">
                <h1 className="mb-[10px]">
                    <img src="/OperaCarmel1200x600.png" alt="Opera Carmel" className="mx-auto max-w-[320px] w-full h-auto" />
                </h1>
                <header className="flex flex-col gap-3 mb-8">
                    <p className="font-light text-[1.15rem] tracking-[0.02em] italic text-[#4a4a4a]">
                        A new tradition begins.
                    </p>
                    <div className="w-16 h-[1px] bg-black mx-auto mt-2"></div>
                </header>

                <section className="font-light text-[1.05rem] leading-relaxed text-gray-800 text-left mb-8">
                    <p>
                        Carmel has always been a place for the arts. Music, theater, poetry, painting and
                        architecture are woven into the history of this small town by the sea. Opera Carmel is
                        part of that continuing story.
                    </p>
                </section>

                <FlodeskForm />
            </div>
        </div>
    );
}
