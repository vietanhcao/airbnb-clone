import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
import getReservations from "../../actions/getReservations";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import ListingClient from "./ListingClient";

interface Iparams {
	listingId?: string;
}

// server component
const ListingPage = async ({ params }: { params: Iparams }) => {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	const reservations = await getReservations(params);

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient
				listing={listing}
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ListingPage;
