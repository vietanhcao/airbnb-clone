import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	const { email, password, name } = body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword,
		},
	});

	return NextResponse.json(user);
}
