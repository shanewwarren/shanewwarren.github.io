import type { HTMLAttributes } from "react";
import { getFormattedDate } from "@/utils/date";

interface Props extends HTMLAttributes<HTMLTimeElement> {
	date: Date;
	dateTimeOptions?: Intl.DateTimeFormatOptions;
}

export function FormattedDate({ date, dateTimeOptions, ...attrs }: Props) {
	const postDate = getFormattedDate(date, dateTimeOptions);
	const ISO = date.toISOString();

	return (
		<time dateTime={ISO} title={ISO} {...attrs}>
			{postDate}
		</time>
	);
}
