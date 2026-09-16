export default function AboutPage() {
	return (
		<div className="flex flex-col items-center min-h-screen p-5 py-20 text-center bg-white text-black font-inter">
			<div className="max-w-[700px] w-full flex flex-col gap-12">
				<header className="flex flex-col gap-4 items-center">
					<p className="font-josefin text-sm tracking-[0.4em] uppercase mb-2">Opera Carmel</p>
					<h1 className="font-normal text-[clamp(2rem,6vw,3.5rem)] tracking-[0.1em] uppercase leading-tight">
						About
					</h1>
					<div className="w-16 h-[1px] bg-black mx-auto mt-4"></div>
				</header>

				<section className="font-light text-[1.1rem] leading-relaxed text-gray-800 flex flex-col gap-8 text-justify">
					<p className="italic text-center text-lg font-normal">
						“Opera belongs here.”
					</p>

					<p>
						Carmel has always been a place for the arts. Music, theater, poetry, painting and
						architecture are woven into the history of this small town by the sea. Opera Carmel is
						part of that continuing story.
					</p>

					<p>
						We bring opera to the Monterey Peninsula through an annual production and a season of
						performances and events that draw audiences into the music, the theater and the lives
						behind both.
					</p>

					<p>
						Our productions bring together exceptional singers, musicians and directors to create
						opera on an intimate scale, where the voice, the orchestra and the drama can be
						experienced up close.
					</p>

					<p>
						We want to make opera that is musically serious, theatrically alive and unmistakably
						of our time.
					</p>
				</section>

				<footer className="mt-12 pt-8 border-t border-[#eaeaea]">
					<p className="font-inter text-xs tracking-[0.2em] uppercase text-gray-500">
						Opera Carmel · A new resident opera company
					</p>
				</footer>
			</div>
		</div>
	);
}
