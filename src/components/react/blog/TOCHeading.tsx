import type { TocItem } from "@/utils/generateToc";

interface Props {
	heading: TocItem;
}

export function TOCHeading({ heading }: Props) {
	const { children, depth, slug, text } = heading;

	return (
		<li className={depth > 2 ? "ms-2" : ""}>
			<a
				className={`line-clamp-2 hover:text-accent ${depth <= 2 ? "mt-3" : "mt-2 text-xs"}`}
				href={`#${slug}`}
			>
				<span aria-hidden="true" className="me-0.5">
					#
				</span>
				{text}
			</a>
			{children.length > 0 && (
				<ol>
					{children.map((subheading) => (
						<TOCHeading key={subheading.slug} heading={subheading} />
					))}
				</ol>
			)}
		</li>
	);
}
