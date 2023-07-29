import { Prisma, User } from "@prisma/client";

// type of use after change data date to ISOString
export type SafeUser = Omit<
	User,
	"createdAt" | "updatedAt" | "emailVerified"
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

// 1: Define a type that includes the relation to `User`
const listingWithUser = Prisma.validator<Prisma.ListingArgs>()({
	include: { user: true },
});

// 2: This type will include a listing and all their user
export type ListingWithUser = Prisma.ListingGetPayload<typeof listingWithUser>;

const reservationWithListing = Prisma.validator<Prisma.ReservationArgs>()({
	include: { listing: true },
});

export type ReservationWithListing = Prisma.ReservationGetPayload<
	typeof reservationWithListing
>;
