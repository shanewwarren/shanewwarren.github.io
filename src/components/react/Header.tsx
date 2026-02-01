import { useCallback, useState } from "react";
import { menuLinks, siteConfig } from "@/site.config";
import { Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
	pathname: string;
}

export function Header({ pathname }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = useCallback(() => {
		setMenuOpen((prev) => !prev);
	}, []);

	return (
		<header
			className={`group relative mb-28 flex items-center sm:ps-18 ${menuOpen ? "menu-open" : ""}`}
			id="main-header"
		>
			<div className="flex sm:flex-col">
				<a
					aria-current={pathname === "/" ? "page" : undefined}
					className="inline-flex items-center sm:relative sm:inline-block sm:grayscale sm:hover:filter-none"
					href="/"
				>
					<svg
						aria-hidden="true"
						className="me-3 h-10 w-6 sm:absolute sm:-start-18 sm:me-0 sm:h-20 sm:w-12"
						fill="none"
						focusable="false"
						viewBox="0 0 272 480"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Astro Cactus Logo</title>
						<path
							fill="#cdffb8"
							d="M181.334 93.333v-40L226.667 80v40zM136.001 53.333 90.667 26.667v426.666L136.001 480zM45.333 220 0 193.334v140L45.333 360z"
						/>
						<path
							fill="#d482ab"
							d="M90.667 26.667 136.001 0l45.333 26.667-45.333 26.666zM181.334 53.33l45.333-26.72L272 53.33 226.667 80zM136 240l-45.333-26.67v53.34zM0 193.33l45.333-26.72 45.334 26.72L45.333 220zM181.334 93.277 226.667 120l-45.333 26.67z"
						/>
						<path
							fill="#2abc89"
							d="m136 53.333 45.333-26.666v120L226.667 120V80L272 53.333V160l-90.667 53.333v240L136 480V306.667L45.334 360V220l45.333-26.667v73.334L136 240z"
						/>
					</svg>
					<span className="text-xl font-bold sm:text-2xl">{siteConfig.title}</span>
				</a>
				<nav
					aria-label="Main menu"
					className={`bg-global-bg absolute -inset-x-4 top-12 hidden flex-col divide-y px-2 py-4 sm:static sm:z-auto sm:-ms-4 sm:mt-1 sm:flex sm:flex-row sm:divide-x sm:divide-y-0 sm:bg-transparent sm:p-0 ${menuOpen ? "z-50 flex" : ""}`}
					id="navigation-menu"
				>
					{menuLinks.map((link) => (
						<a
							key={link.path}
							aria-current={pathname === link.path ? "page" : undefined}
							className="text-accent px-2 py-4 font-semibold sm:px-4 sm:py-0 sm:underline-offset-2 sm:hover:underline"
							href={link.path}
						>
							{link.title}
						</a>
					))}
				</nav>
			</div>
			<Search />
			<ThemeToggle />
			<div className="ms-4 sm:invisible sm:hidden">
				<button
					aria-expanded={menuOpen}
					aria-haspopup="menu"
					className="group relative h-7 w-7"
					id="toggle-navigation-menu"
					type="button"
					onClick={toggleMenu}
				>
					<span className="sr-only">Open main menu</span>
					<svg
						aria-hidden="true"
						className={`absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all ${menuOpen ? "scale-0 opacity-0" : ""}`}
						fill="none"
						focusable="false"
						stroke="currentColor"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M3.75 9h16.5m-16.5 6.75h16.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<svg
						aria-hidden="true"
						className={`text-accent absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all ${menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
						fill="none"
						focusable="false"
						stroke="currentColor"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>
		</header>
	);
}
