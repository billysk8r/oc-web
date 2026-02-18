import type { Metadata } from "next";
import { Josefin_Sans, Inter } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
	variable: "--font-josefin",
	subsets: ["latin"],
	weight: ["300", "400", "700"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["300", "400"],
});

export const metadata: Metadata = {
	title: "Opera Carmel | A new tradition begins",
	description: "A new resident opera company in Carmel.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${josefinSans.variable} ${inter.variable} antialiased`}>{children}</body>
		</html>
	);
}
