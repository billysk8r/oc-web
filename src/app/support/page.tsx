import Link from "next/link";

export default function SupportPage() {
    return (
        <div className="flex flex-col items-center w-full p-5 text-center bg-white text-black font-inter">
            <div className="max-w-[600px] w-full flex-1">
                <h1 className="mb-[10px]">
                    <img src="/OperaCarmel1200x600.png" alt="Opera Carmel" className="mx-auto max-w-[320px] w-full h-auto" />
                </h1>
                <header className="flex flex-col gap-3 mb-8">
                    <p className="font-light text-[1.15rem] tracking-[0.02em] italic text-[#4a4a4a]">
                        Help Us Give Opera a Home in Carmel
                    </p>
                    <div className="w-16 h-[1px] bg-black mx-auto mt-2"></div>
                </header>

                <section className="font-light text-[1.05rem] leading-relaxed text-gray-800 flex flex-col gap-8 text-left mb-8">
                    <p className="italic">
                        Opera that belongs here.
                    </p>

                    <p>
                        Carmel has always been a place where the arts matter. For generations, painters, writers,
                        musicians, and performers have shaped the character of this remarkable community. We believe opera
                        deserves a place in that story.
                    </p>

                    <p>
                        Opera Carmel was founded with a vision: to bring fully staged, professional opera to the Monterey
                        Peninsula and establish a lasting home for an art form that has moved audiences for more than four
                        centuries.
                    </p>

                    <p>
                        But our ambitions reach beyond the mainstage.
                    </p>

                    <p>
                        We envision a lively musical presence throughout the year, with concerts, recitals, masterclasses,
                        and opportunities to encounter opera in unexpected places. We want young people to discover the
                        thrill of a human voice filling a theater, audiences to meet the artists behind the music, and
                        accomplished singers and musicians to find a creative home here.
                    </p>

                    <p className="font-bold">
                        Your support makes this possible.
                    </p>

                    <p>
                        Every production begins long before the curtain rises. Singers must be engaged, musicians brought
                        together, rehearsal spaces secured, costumes and sets created. Behind every moment of beauty onstage
                        are countless hours of preparation and the generosity of people who believe that art is worth making.
                    </p>

                    <p>
                        Your gift helps us turn artistic ambition into something tangible: paid opportunities for professional
                        artists, meaningful musical encounters for our community, and productions that will become part of
                        Carmel's cultural life.
                    </p>

                    <p>
                        We are a young company with considerable dreams, and this is a rare opportunity to help shape
                        something from its very beginning.
                    </p>

                    <p>
                        Opera has always flourished because people chose to champion it. We invite you to become one of those people.
                    </p>

                    <p className="font-bold">
                        Help us write the first chapter of Opera Carmel's story.
                    </p>

                    <Link
                        href="https://www.zeffy.com/en-US/donation-form/support-opera-carmel"
                        className="inline-block bg-black text-white py-3 px-8 uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors font-josefin text-sm"
                    >
                        SUPPORT OPERA CARMEL →
                    </Link>

                    <p className="mt-6 text-[0.85rem] text-gray-500 italic">
                        Opera Carmel is a 501(c)(3) nonprofit organization. Contributions are tax-deductible to the extent permitted by law.
                    </p>
                </section>
            </div>
        </div>
    );
}
