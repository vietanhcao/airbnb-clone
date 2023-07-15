"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
	currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
	return (
		<div className="fixed w-full h-16 bg-white z-10 shadow-ms">
			<div
				className="
          py-4
          border-b-[1px]
        "
			>
				<Container>
					<div
						className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
					>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default Navbar;
