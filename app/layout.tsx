import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import ResiterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
	title: "Airbnb",
	description: "Airbnb clone",
};

const font = Nunito({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<ResiterModal />
					<SearchModal />
					<LoginModal />
					<RentModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div
					className="
						pb-20
						pt-28
					"
				>
					{children}
				</div>
			</body>
		</html>
	);
}
