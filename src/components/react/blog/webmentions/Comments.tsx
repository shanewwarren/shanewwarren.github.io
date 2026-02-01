import { Icon } from "@iconify/react";
import type { WebmentionsChildren } from "@/types";

interface Props {
	mentions: WebmentionsChildren[];
}

const validComments = ["mention-of", "in-reply-to"];

export function Comments({ mentions }: Props) {
	const comments = mentions.filter(
		(mention) => validComments.includes(mention["wm-property"]) && mention.content?.text,
	);

	if (!comments.length) return null;

	return (
		<div>
			<p className="text-accent-2 mb-0">
				<strong>{comments.length}</strong> Mention{comments.length > 1 ? "s" : ""}
			</p>
			<ul className="divide-global-text/20 mt-0 divide-y ps-0">
				{comments.map((mention) => (
					<li
						key={mention["wm-id"]}
						className="p-comment h-cite my-0 flex items-start gap-x-5 py-5"
					>
						{mention.author?.photo && mention.author.photo !== "" ? (
							mention.author.url && mention.author.url !== "" ? (
								<a
									className="u-author not-prose ring-global-text hover:ring-link focus-visible:ring-link shrink-0 overflow-hidden rounded-full ring-2 hover:ring-4 focus-visible:ring-4"
									href={mention.author.url}
									rel="noreferrer"
									target="_blank"
									title={mention.author.name}
								>
									<img
										alt={mention.author?.name}
										className="u-photo my-0 h-12 w-12"
										height={48}
										src={mention.author?.photo}
										width={48}
									/>
								</a>
							) : (
								<img
									alt={mention.author?.name}
									className="u-photo my-0 h-12 w-12 rounded-full"
									height={48}
									src={mention.author?.photo}
									width={48}
								/>
							)
						) : null}
						<div className="flex-auto">
							<div className="p-author h-card flex items-center justify-between gap-x-2">
								<p className="p-name text-accent-2 my-0 line-clamp-1 font-semibold">
									{mention.author?.name}
								</p>
								<a
									aria-labelledby="cmt-source"
									className="u-url not-prose hover:text-link"
									href={mention.url}
									rel="noreferrer"
									target="_blank"
								>
									<span className="hidden" id="cmt-source">
										Visit the source of this webmention
									</span>
									<Icon icon="mdi:open-in-new" className="h-5 w-5" aria-hidden="true" />
								</a>
							</div>
							<p className="comment-content mt-1 mb-0 whitespace-pre-wrap [word-break:break-word]">
								{mention.content?.text}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
