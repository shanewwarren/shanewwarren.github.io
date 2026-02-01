import type { MarkdownHeading } from "astro";
import { generateToc } from "@/utils/generateToc";
import { TOCHeading } from "./TOCHeading";

interface Props {
	headings: MarkdownHeading[];
}

export function TOC({ headings }: Props) {
	const toc = generateToc(headings);

	return (
		<details open className="lg:sticky lg:top-12 lg:order-2 lg:-me-32 lg:basis-64">
			<summary className="title hover:marker:text-accent cursor-pointer text-lg">
				Table of Contents
			</summary>
			<nav className="ms-4 lg:w-full">
				<ol className="mt-4">
					{toc.map((heading) => (
						<TOCHeading key={heading.slug} heading={heading} />
					))}
				</ol>
			</nav>
		</details>
	);
}
