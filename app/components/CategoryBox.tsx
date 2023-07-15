"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";
import qs from "query-string";

interface UpdateQuery {
	[key: string]: any;
	category?: any;
	// Add other properties if needed
}

interface CategoriyBoxProps {
	label: string;
	description?: string;
	icon: IconType;
	seleted?: boolean;
}

const CategoriyBox: React.FC<CategoriyBoxProps> = ({
	label,
	description,
	icon: Icon,
	seleted,
}) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updateQuery: UpdateQuery = {
			...currentQuery,
			category: label,
		};

		if (params?.get("category") === label) {
			delete updateQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updateQuery,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, params, router]);

	return (
		<div
			onClick={handleClick}
			className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${
				seleted
					? "border-b-neutral-800 text-neutral-800"
					: "border-transparent text-neutral-500"
			}
    `}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoriyBox;
