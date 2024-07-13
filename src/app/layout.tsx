import { NextAuthProvider } from "@/app/providers";
import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { APP_NAME } from "@/utils/constants";
import { manifestPath } from "@/utils/pwa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: APP_NAME,
	description: APP_NAME,
	manifest: manifestPath,
	icons: {
		apple: {
			url: "/apple-touch-icon.png",
			sizes: "180x180",
		},
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<div className="mx-auto md:w-[1024px]">
					<NextAuthProvider>{children}</NextAuthProvider>
				</div>
			</body>
		</html>
	);
}
