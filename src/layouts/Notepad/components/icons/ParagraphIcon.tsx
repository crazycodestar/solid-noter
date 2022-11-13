import { JSX } from "solid-js";

export function ParagraphIcon(
	props: JSX.IntrinsicElements["svg"]
): JSX.Element {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 24 24"
			stroke="none"
			{...props}
		>
			<path d="M9 16h2v4h2V6h2v14h2V6h3V4H9c-3.309 0-6 2.691-6 6s2.691 6 6 6zM9 6h2v8H9c-2.206 0-4-1.794-4-4s1.794-4 4-4z" />
		</svg>
	);
}
