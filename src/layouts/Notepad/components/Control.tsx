import { Editor } from "@tiptap/core";
import { Toggle } from "solid-headless";
import { JSX } from "solid-js/jsx-runtime";
import { createEditorTransaction } from "solid-tiptap";

interface ControlProps {
	class: string;
	editor: Editor;
	title: string;
	key: string;
	onChange: () => void;
	isActive?: (editor: Editor) => boolean;
	children: JSX.Element;
}

export function Control(props: ControlProps): JSX.Element {
	const flag = createEditorTransaction(
		() => props.editor,
		(instance) => {
			if (props.isActive) {
				return props.isActive(instance);
			}
			return instance.isActive(props.key);
		}
	);

	return (
		<Toggle
			defaultPressed={false}
			class={`${props.class} w-6 h-6 flex items-center justify-center rounded focus:outline-none focus-visible:ring focus-visible:ring-purple-400 focus-visible:ring-opacity-75`}
			classList={{
				"text-color-600 bg-white bg-opacity-25": flag(),
			}}
			title={props.title}
			onChange={props.onChange}
		>
			{props.children}
		</Toggle>
	);
}
