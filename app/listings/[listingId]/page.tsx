import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
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

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient listing={listing} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ListingPage;
