import { useCallback, useEffect, useRef, useState } from "react";

export function Search() {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const dialogFrameRef = useRef<HTMLDivElement>(null);
	const searchContainerRef = useRef<HTMLDivElement>(null);
	const pagefindInitialized = useRef(false);

	const openModal = useCallback(() => {
		dialogRef.current?.showModal();
		setIsOpen(true);
		// Focus the search input after dialog opens
		setTimeout(() => {
			dialogRef.current?.querySelector("input")?.focus();
		}, 0);
	}, []);

	const closeModal = useCallback(() => {
		dialogRef.current?.close();
		setIsOpen(false);
	}, []);

	// Handle clicks outside dialog frame to close
	const handleBackdropClick = useCallback(
		(event: MouseEvent) => {
			const target = event.target as Node;
			const isLink = "href" in (target || {});
			if (isLink || (document.body.contains(target) && !dialogFrameRef.current?.contains(target))) {
				closeModal();
			}
		},
		[closeModal],
	);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				if (dialogRef.current?.open) {
					closeModal();
				} else {
					openModal();
				}
			}
		};

		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	}, [openModal, closeModal]);

	// Handle click outside when dialog is open
	useEffect(() => {
		if (isOpen) {
			window.addEventListener("click", handleBackdropClick);
			return () => window.removeEventListener("click", handleBackdropClick);
		}
	}, [isOpen, handleBackdropClick]);

	// Initialize Pagefind on idle
	useEffect(() => {
		if (import.meta.env.DEV || pagefindInitialized.current) return;

		const onIdle = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
		onIdle(async () => {
			const { PagefindUI } = await import("@pagefind/default-ui");
			new PagefindUI({
				baseUrl: import.meta.env.BASE_URL,
				bundlePath: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/pagefind/`,
				element: "#cactus__search",
				showImages: false,
				showSubResults: true,
			});
			pagefindInitialized.current = true;
		});
	}, []);

	return (
		<div className="ms-auto" id="search">
			<button
				type="button"
				className="hover:text-accent flex h-9 w-9 cursor-pointer items-center justify-center rounded-md"
				aria-keyshortcuts="Control+K Meta+K"
				onClick={(e) => {
					e.stopPropagation();
					openModal();
				}}
			>
				<svg
					aria-hidden="true"
					className="h-7 w-7"
					fill="none"
					height="16"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					viewBox="0 0 24 24"
					width="16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0h24v24H0z" stroke="none" />
					<path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" />
				</svg>
				<span className="sr-only">Open Search</span>
			</button>
			<dialog
				ref={dialogRef}
				aria-label="search"
				className="bg-global-bg h-full max-h-full w-full max-w-full border border-zinc-400 shadow-sm backdrop:backdrop-blur-sm open:flex sm:mx-auto sm:mt-16 sm:mb-auto sm:h-max sm:max-h-[calc(100%-8rem)] sm:min-h-[15rem] sm:w-5/6 sm:max-w-[48rem] sm:rounded-md"
			>
				<div
					ref={dialogFrameRef}
					className="dialog-frame flex grow flex-col gap-4 p-6 pt-12 sm:pt-6"
				>
					<button
						type="button"
						className="ms-auto cursor-pointer rounded-md bg-zinc-200 p-2 font-semibold dark:bg-zinc-700"
						onClick={closeModal}
					>
						Close
					</button>
					{import.meta.env.DEV ? (
						<div className="mx-auto text-center">
							<p>
								Search is only available in production builds. <br />
								Try building and previewing the site to test it out locally.
							</p>
						</div>
					) : (
						<div ref={searchContainerRef} className="search-container">
							<div id="cactus__search" />
						</div>
					)}
				</div>
			</dialog>
		</div>
	);
}
