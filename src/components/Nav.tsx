"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
	label: string;
	href: string;
}

const links: NavLink[] = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
];

export default function Nav() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="bg-white border-b border-[#eaeaea]">
			<div className="max-w-[1100px] mx-auto flex items-center justify-between px-5 py-4">
				<Link href="/" className="font-josefin font-normal text-xl text-black hover:text-gray-700 transition-colors">
					Opera Carmel
				</Link>

				{/* Wide viewport: horizontal links */}
				<div className="hidden md:flex items-center gap-8">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`text-sm font-inter tracking-[0.2em] uppercase transition-colors ${
								pathname === link.href
									? "text-black"
									: "text-gray-500 hover:text-black"
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Narrow viewport: hamburger menu */}
				<div className="md:hidden">
					<button
						type="button"
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen(!menuOpen)}
						className="flex flex-col w-8 h-6 justify-between items-center text-black hover:text-gray-700 transition-colors"
					>
						<span className="block w-full h-[2px] bg-current transition-all duration-200"></span>
						<span className="block w-full h-[2px] bg-current transition-all duration-200"></span>
						<span className="block w-full h-[2px] bg-current transition-all duration-200"></span>
					</button>
				</div>
			</div>

			{/* Mobile menu panel */}
			{menuOpen && (
				<div className="md:hidden border-t border-[#eaeaea]">
					<div className="max-w-[1100px] mx-auto flex flex-col py-2">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className={`text-left px-5 py-3 text-sm font-inter tracking-[0.2em] uppercase transition-colors ${
									pathname === link.href
										? "text-black bg-gray-50"
										: "text-gray-500 hover:text-black hover:bg-gray-50"
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
