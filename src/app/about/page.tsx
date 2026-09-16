export default function AboutPage() {
	return (
		<div className="flex flex-col items-center w-full p-5 py-20 text-center bg-white text-black font-inter">
			<div className="max-w-[700px] w-full flex flex-col gap-12">
				<section className="font-light text-[1.1rem] leading-relaxed text-gray-800 flex flex-col gap-8 text-justify">
					<p className="italic text-center text-lg font-normal">
						Opera that belongs here.
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
			</div>
		</div>
	);
}
