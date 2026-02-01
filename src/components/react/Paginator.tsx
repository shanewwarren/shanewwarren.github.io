import type { PaginationLink } from "@/types";

interface Props {
	nextUrl?: PaginationLink;
	prevUrl?: PaginationLink;
}

export function Paginator({ nextUrl, prevUrl }: Props) {
	if (!prevUrl && !nextUrl) return null;

	return (
		<nav className="mt-8 flex items-center gap-x-4">
			{prevUrl && (
				<a className="hover:text-accent me-auto py-2" href={prevUrl.url}>
					{prevUrl.srLabel && <span className="sr-only">{prevUrl.srLabel}</span>}
					{prevUrl.text ? prevUrl.text : "Previous"}
				</a>
			)}
			{nextUrl && (
				<a className="hover:text-accent ms-auto py-2" href={nextUrl.url}>
					{nextUrl.srLabel && <span className="sr-only">{nextUrl.srLabel}</span>}
					{nextUrl.text ? nextUrl.text : "Next"}
				</a>
			)}
		</nav>
	);
}
