export default function Footer() {
	return (
		<footer className="mt-12 pt-8 border-t border-[#eaeaea] w-full">
			<div className="max-w-[1100px] mx-auto flex flex-col items-center gap-2">
				<p className="font-inter text-xs tracking-[0.2em] uppercase text-gray-500">
					Opera Carmel
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
	);
}
