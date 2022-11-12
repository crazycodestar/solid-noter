import { JSX } from "solid-js/jsx-runtime";
import pattern from "../../../assets/images/pattern.png";

type Variants = "priamry" | "dark" | "frosted" | "frosted-primary";

interface IButtonProps {
	children: JSX.Element;
	onClick?: () => void;
	variant?: Variants;
}
export const Button = (props: IButtonProps) => {
	const { children, onClick, variant = "primary" } = props;

	const generateStyles = () => {
		const baseStyles =
			"px-6 h-12 text-white font-medium font-Source_Sans_Pro rounded-md capitalize transition-shadow duration-200";

		if (variant === "dark") {
			return baseStyles.concat(" ", "bg-slate-600");
		}

		if (variant === "frosted")
			return baseStyles.concat(
				" ",
				"backdrop-blur-sm text-slate-900 shadow-lg hover:bg-slate-100 active:shadow-none"
			);

		if (variant === "frosted-primary")
			return baseStyles.concat(
				" ",
				"backdrop-blur-sm text-slate-900 shadow-lg shadow-blue-300 bg-blue-300 hover:bg-blue-200 active:shadow-none"
			);

		return baseStyles.concat(" ", "bg-blue-400");
	};

	return (
		<button onClick={onClick} class={generateStyles()}>
			{children}
		</button>
	);
};
