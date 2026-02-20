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
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head />
			<body className={`${josefinSans.variable} ${inter.variable} antialiased`}>{children}</body>
		</html>
	);
}
