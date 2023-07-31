import prisma from "../libs/prismadb";

export interface IListingParams {
	userId?: string;
}

export default async function getListings(params: IListingParams) {
	try {
		const { userId } = params;

		let query: { [key: string]: any } = {};

		if (userId) {
			query["userId"] = userId;
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: "desc",
			},
		});

		return listings;
	} catch (error) {
		console.log("getListings error", error);
		throw new Error("something went wrong");
	}
}
