import { JSX } from "solid-js/jsx-runtime";
import pattern from "../../../assets/images/pattern.png";

type Variants =
	| "priamry"
	| "dark"
	| "frosted"
	| "frosted-primary"
	| "secondary";

type Size = "sm" | "md" | "lg";

interface IButtonProps {
	children: JSX.Element;
	onClick?: () => void;
	variant?: Variants;
	size?: Size;
}
export const Button = (props: IButtonProps) => {
	const { children, onClick, variant = "primary", size = "md" } = props;

	const generateStyles = () => {
		let baseStyles =
			"px-6 text-white font-medium font-Source_Sans_Pro rounded-md capitalize transition-shadow duration-200";

		switch (variant) {
			case "secondary":
				baseStyles = baseStyles.concat(
					" ",
					"bg-slate-300 text-black hover:bg-slate-400 active:bg-slate-300"
				);
				break;
			case "dark":
				baseStyles = baseStyles.concat(" ", "bg-slate-600");
				break;

			case "frosted":
				baseStyles = baseStyles.concat(
					" ",
					"backdrop-blur-sm text-slate-900 shadow-lg hover:bg-slate-100 active:shadow-none"
				);
				break;

			case "frosted-primary":
				baseStyles = baseStyles.concat(
					" ",
					"backdrop-blur-sm text-slate-900 shadow-lg shadow-blue-300 bg-blue-300 hover:bg-blue-200 active:shadow-none"
				);
				break;
			default:
				baseStyles = baseStyles.concat(" ", "bg-blue-400");
				break;
		}

		switch (size) {
			case "sm":
				baseStyles = baseStyles.concat(" ", "h-10 px-2 min-w-[32px]");
				break;

			case "md":
				baseStyles = baseStyles.concat(" ", "h-12");
				break;

			case "lg":
				baseStyles = baseStyles.concat(" ", "h-18");
				break;
		}

		return baseStyles;
	};

	return (
		<button onClick={onClick} class={generateStyles()}>
			{children}
		</button>
	);
};
