import type { CollectionEntry } from "astro:content";
import { FormattedDate } from "../FormattedDate";

interface Props {
	as?: keyof JSX.IntrinsicElements;
	post: CollectionEntry<"post">;
	withDesc?: boolean;
}

export function PostPreview({ as: Tag = "div", post, withDesc = false }: Props) {
	return (
		<>
			<FormattedDate
				className="min-w-30 font-semibold text-gray-600 dark:text-gray-400"
				date={post.data.publishDate}
			/>
			<Tag>
				{post.data.draft && <span className="text-red-500">(Draft) </span>}
				<a className="cactus-link" href={`/posts/${post.id}/`}>
					{post.data.title}
				</a>
			</Tag>
			{withDesc && <q className="line-clamp-3 italic">{post.data.description}</q>}
		</>
	);
}
