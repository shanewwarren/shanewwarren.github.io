import { menuLinks, siteConfig } from "@/site.config";

const year = new Date().getFullYear();

export function Footer() {
	return (
		<footer className="mt-auto flex w-full flex-col items-center justify-center gap-y-2 pt-20 pb-4 text-center align-top font-semibold text-gray-600 sm:flex-row sm:justify-between sm:text-xs dark:text-gray-400">
			<div className="me-0 sm:me-4">
				&copy; {siteConfig.author} {year}.
				<span className="inline-block">&nbsp;🚀&nbsp;{siteConfig.title}</span>
			</div>
			<nav
				aria-labelledby="footer_links"
				className="flex gap-x-2 sm:gap-x-0 sm:divide-x sm:divide-gray-500"
			>
				<p id="footer_links" className="sr-only">
					More on this site
				</p>
				{menuLinks.map((link) => (
					<a
						key={link.path}
						className="hover:text-global-text px-4 py-2 hover:underline sm:py-0"
						href={link.path}
					>
						{link.title}
					</a>
				))}
			</nav>
		</footer>
	);
}
