import prisma from "../libs/prismadb";
import { Prisma } from ".prisma/client/index";

export interface IListingParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export default async function getListings(params: IListingParams) {
	try {
		const {
			userId,
			guestCount,
			roomCount,
			bathroomCount,
			startDate,
			endDate,
			locationValue,
			category,
		} = params;

		let query: Prisma.ListingWhereInput = {};

		if (userId) {
			query["userId"] = userId;
		}

		if (category) {
			query["category"] = category;
		}

		if (guestCount) {
			query["guestCount"] = guestCount;
		}

		if (roomCount) {
			query["roomCount"] = {
				gte: +roomCount,
			};
		}

		if (guestCount) {
			query["guestCount"] = {
				gte: +guestCount,
			};
		}

		if (bathroomCount) {
			query["bathroomCount"] = {
				gte: +bathroomCount,
			};
		}

		if (locationValue) {
			query["locationValue"] = locationValue;
		}

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: {
									gte: startDate,
								},
								startDate: {
									lte: startDate,
								},
							},
							{
								startDate: {
									lte: endDate,
								},
								endDate: {
									gte: endDate,
								},
							},
						],
					},
				},
			};
		}

		// console.log("params", params);
		// console.log("query", JSON.stringify(query, null, 2));

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
