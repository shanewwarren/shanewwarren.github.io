import type { WebmentionsChildren } from "@/types";

interface Props {
	mentions: WebmentionsChildren[];
}

const MAX_LIKES = 10;

export function Likes({ mentions }: Props) {
	const likes = mentions.filter((mention) => mention["wm-property"] === "like-of");
	const likesToShow = likes
		.filter((like) => like.author?.photo && like.author.photo !== "")
		.slice(0, MAX_LIKES);

	if (!likes.length) return null;

	return (
		<div>
			<p className="text-accent-2 mb-0">
				<strong>{likes.length}</strong>
				{likes.length > 1 ? " People" : " Person"} liked this
			</p>
			{likesToShow.length > 0 && (
				<ul className="flex list-none flex-wrap overflow-hidden ps-2">
					{likesToShow.map((like) => (
						<li key={like["wm-id"]} className="p-like h-cite -ms-2">
							<a
								className="u-url not-prose ring-global-text hover:ring-link focus-visible:ring-link relative inline-block overflow-hidden rounded-full ring-2 hover:z-10 hover:ring-4 focus-visible:z-10 focus-visible:ring-4"
								href={like.author?.url}
								rel="noreferrer"
								target="_blank"
								title={like.author?.name}
							>
								<span className="p-author h-card">
									<img
										alt={like.author?.name}
										className="u-photo my-0 inline-block h-12 w-12"
										height={48}
										src={like.author?.photo}
										width={48}
									/>
								</span>
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
