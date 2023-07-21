import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IFavorite {
	listingId: string;
	currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const hasFavorited = useMemo(() => {
		if (!currentUser) {
			return false;
		}

		return currentUser.favoriteIds?.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			setIsLoading(true);
			// not sign in
			if (!currentUser) {
				loginModal.onOpen();
				return;
			}
			try {
				if (isLoading) return;
				let request;
				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}

				await request();
				router.refresh();
				toast.success("Success");
			} catch (error) {
				toast.error("Something went wrong");
			} finally {
				setIsLoading(false);
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router, isLoading]
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};

export default useFavorite;
