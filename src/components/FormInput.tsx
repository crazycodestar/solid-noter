import { Component, createSignal, JSX, Show } from "solid-js";

interface IFormInput extends JSX.InputHTMLAttributes<HTMLInputElement> {
	error?: string | string[] | undefined;
}

const FormInput: Component<IFormInput> = (props) => {
	return (
		<div class="w-full mb-3">
			<input
				class="w-full px-3 py-2 rounded-sm bg-slate-200 focus:outline-none"
				{...props}
			/>
			<Show when={props.error}>
				<p class="text-red-500">{props.error}</p>
			</Show>
		</div>
	);
};

export default FormInput;
