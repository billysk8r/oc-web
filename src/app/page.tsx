import FlodeskForm from "@/components/FlodeskForm";

export default function Home() {
	return (
		<div className="flex flex-col items-center min-h-screen p-5 text-center bg-white text-black font-inter">
			<div className="max-w-[600px] w-full flex-1">
				<h1 className="font-josefin font-normal text-[clamp(2.5rem,8vw,4rem)] tracking-[0.15em] uppercase mb-[10px]">
					Opera Carmel
				</h1>
				<p className="font-light text-[1.15rem] tracking-[0.02em] mb-[25px] italic text-[#4a4a4a]">
					A new tradition begins.
				</p>
				<p className="font-normal text-[0.9rem] tracking-[0.3em] uppercase border-t border-[#eaeaea] inline-block pt-[15px] mb-8">
					Coming 2026
				</p>

				<FlodeskForm />
			</div>

			<footer className="mt-12 pt-8 border-t border-[#eaeaea] w-full max-w-[600px]">
				<div className="flex flex-col items-center gap-2">
					<p className="font-inter text-xs tracking-[0.2em] uppercase text-gray-500">
						Opera Carmel · A new resident opera company
					</p>
					<p className="font-inter text-xs text-gray-500">
						P.O. Box 1167, Carmel-by-the-Sea, CA 93921
					</p>
					<p className="font-inter text-xs text-gray-500">
						<a
							href="mailto:info@operacarmel.com"
							className="hover:text-black transition-colors"
						>
							info@operacarmel.com
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}
