"use client";

import { formatISO } from "date-fns/esm";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import useSearchModal from "../../hooks/useSearchModal";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Modal from "./Modal";

enum Step {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [location, setLocation] = useState<CountrySelectValue>();
	const [step, setStep] = useState(Step.LOCATION);
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[location]
	);

	const onBack = useCallback(() => {
		setStep((step) => step - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((step) => step + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== Step.INFO) {
			return onNext();
		}

		let currentQuery = {};
		if (params) {
			currentQuery = queryString.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = queryString.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(Step.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		step,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		dateRange,
		onNext,
		router,
		params,
		searchModal,
	]);

	const actionLabel = useMemo(() => {
		if (step === Step.INFO) {
			return "Search";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === Step.LOCATION) {
			return undefined;
		}

		return "Back";
	}, [step]);

	// step 0
	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you wanna go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	// step 1
	if (step === Step.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="When do you plan to go?"
					subtitle="Make sure everyone is free!"
				/>
				<Calendar
					value={dateRange}
					onChange={(value) => setDateRange(value.selection)}
				/>
			</div>
		);
	}

	// step 2
	if (step === Step.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="More info" subtitle="Find your perfect place!" />
				<Counter
					title="Guests"
					subtitle="How many people are comming?"
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<Counter
					title="Romms"
					subtitle="How many rooms do you need?"
					value={roomCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you need?"
					value={bathroomCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSumbit={onSubmit}
			title="Filter"
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === Step.LOCATION ? undefined : onBack}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
