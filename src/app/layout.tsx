import { NextAuthProvider } from "@/app/providers";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "App",
	description: "app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	);
}
