import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import ResiterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
	title: "Airbnb",
	description: "Airbnb clone  ",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<ResiterModal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
