import { FormattedDate } from "../FormattedDate";

interface PostData {
	coverImage?: {
		alt: string;
		src: string;
	};
	draft?: boolean;
	publishDate: Date;
	tags?: string[];
	title: string;
	updatedDate?: Date;
}

interface Props {
	data: PostData;
	readingTime: string;
	coverImageSrc?: string;
}

const dateTimeOptions: Intl.DateTimeFormatOptions = {
	month: "long",
};

export function Masthead({ data, readingTime, coverImageSrc }: Props) {
	return (
		<>
			{data.coverImage && coverImageSrc && (
				<div className="mb-6 aspect-video">
					<img
						alt={data.coverImage.alt}
						className="h-full w-full object-cover"
						src={coverImageSrc}
					/>
				</div>
			)}
			{data.draft ? <span className="text-base text-red-500">(Draft)</span> : null}
			<h1 className="title">{data.title}</h1>
			<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
				<p className="font-semibold">
					<FormattedDate date={data.publishDate} dateTimeOptions={dateTimeOptions} /> /{" "}
					{readingTime}
				</p>
				{data.updatedDate && (
					<span className="bg-quote/5 text-quote rounded-lg px-2 py-1">
						Updated:
						<FormattedDate
							className="ms-1"
							date={data.updatedDate}
							dateTimeOptions={dateTimeOptions}
						/>
					</span>
				)}
			</div>
			{data.tags && data.tags.length > 0 && (
				<div className="mt-2">
					<svg
						aria-hidden="true"
						className="inline-block h-6 w-6"
						fill="none"
						focusable="false"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0 0h24v24H0z" fill="none" stroke="none" />
						<path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z" />
						<path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116" />
						<path d="M6 9h-.01" />
					</svg>
					{data.tags.map((tag, i) => (
						<span key={tag} className="contents">
							<a
								className="cactus-link inline-block before:content-['#']"
								data-pagefind-filter={`tag:${tag}`}
								href={`/tags/${tag}/`}
							>
								<span className="sr-only">View more blogs with the tag&nbsp;</span>
								{tag}
							</a>
							{data.tags && i < data.tags.length - 1 && ", "}
						</span>
					))}
				</div>
			)}
		</>
	);
}
