import { createTiptapEditor, createEditorTransaction } from "solid-tiptap";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { createSignal, JSX, Show } from "solid-js";
import { Toggle, Toolbar } from "solid-headless";
import { CONTENT } from "./components/content";
import { ToolbarContents } from "./components/ToolbarContents";

export function Notepad(): JSX.Element {
	const [container, setContainer] = createSignal<HTMLDivElement>();
	const [menu, setMenu] = createSignal<HTMLDivElement>();

	const editor = createTiptapEditor(() => ({
		element: container()!,
		extensions: [
			StarterKit,
			BubbleMenu.configure({
				element: menu()!,
			}),
		],
		editorProps: {
			attributes: {
				class: "p-8 focus:outline-none prose max-w-full",
			},
		},
		content: CONTENT,
	}));

	return (
		<div class="md:mt-6 md:rounded-md md:mb-6 md:mr-6 w-full bg-white flex flex-col">
			<div class="flex-1 m-16">
				<Toolbar
					ref={setMenu}
					class="dynamic-shadow bg-gradient-to-bl from-indigo-500 to-blue-600 text-white rounded-lg"
					horizontal
				>
					<Show when={editor()} keyed>
						{(instance) => <ToolbarContents editor={instance} />}
					</Show>
				</Toolbar>
				<div
					class="w-full h-max max-h-max max-w-3xl focus:outline-none overflow-y-auto flex justify-center px-6 pt-12 ml-auto mr-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
					ref={setContainer}
				/>
			</div>
		</div>
	);
}
