import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from "../../../libs/prismadb";

interface IParams {
	listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const { listingId } = params;

	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	if (!listingId || typeof listingId !== "string") {
		return NextResponse.error();
	}

	const listing = await prisma.listing.deleteMany({
		where: {
			id: listingId,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
}
