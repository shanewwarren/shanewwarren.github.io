import { Icon } from "@iconify/react";

const socialLinks: {
	friendlyName: string;
	isWebmention?: boolean;
	link: string;
	name: string;
}[] = [
	{
		friendlyName: "Github",
		link: "https://github.com/chrismwilliams/astro-cactus",
		name: "mdi:github",
	},
];

export function SocialList() {
	return (
		<div className="flex flex-wrap items-end gap-x-2">
			<p>Find me on</p>
			<ul className="flex flex-1 items-center gap-x-2 sm:flex-initial">
				{socialLinks.map(({ friendlyName, isWebmention, link, name }) => (
					<li key={link} className="flex">
						<a
							className="hover:text-link inline-block"
							href={link}
							rel={`noreferrer ${isWebmention ? "me authn" : ""}`}
							target="_blank"
						>
							<Icon icon={name} className="h-8 w-8" aria-hidden="true" />
							<span className="sr-only">{friendlyName}</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
