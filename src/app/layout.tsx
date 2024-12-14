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
	viewportFit: "cover", // iPhoneでSafeAreaにも被せる
	themeColor: "#2E282A",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<div className="md-width mx-auto">
					<NextAuthProvider>{children}</NextAuthProvider>
				</div>
			</body>
		</html>
	);
}
