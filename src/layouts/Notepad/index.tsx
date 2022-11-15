import { createTiptapEditor } from "solid-tiptap";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { createSignal, JSX, Show } from "solid-js";
import { Toolbar } from "solid-headless";
import { CONTENT } from "./components/content";
import { ToolbarContents } from "./components/ToolbarContents";
import { NoteType, ExtractType, Id } from "../../pages/Notes";

interface INotepadProps {
	updateNote: (
		id: Id,
		newVal: { [T in keyof NoteType]: ExtractType<NoteType, T> }
	) => void;
	note: NoteType | undefined;
}

export function Notepad(props: INotepadProps): JSX.Element {
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
				class: "focus:outline-none w-full content mb-16",
			},
		},
		content: props.note?.note.content || "",
	}));

	return (
		<div class="md:mt-6 md:rounded-md md:mb-6 md:mr-6 w-full bg-white flex flex-col">
			<Toolbar
				ref={setMenu}
				class="dynamic-shadow bg-gradient-to-bl from-indigo-500 to-blue-600 text-white rounded-lg"
				horizontal
			>
				<Show when={editor()} keyed>
					{(instance) => <ToolbarContents editor={instance} />}
				</Show>
			</Toolbar>
			<div class="text-lg font-semibold capitalize pb-2 pt-4 px-4 mb-3 border-b-2 flex space-x-2 items-center">
				<h1>{props.note ? props.note.filename : "no File selected"}</h1>
			</div>
			<div class="pt-16 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent w-full max-h-max px-6 flex flex-col">
				<Show when={Boolean(props.note)}>
					<div class="flex flex-col items-center h-full">
						<textarea
							cols={1}
							rows={1}
							value={props.note?.note.title}
							placeholder="Title"
							class="resize-none scrollbar-none focus:outline-none max-w-2xl w-full text-3xl mb-4 tracking-wide"
						/>
						<div class="max-w-2xl w-full h-full" ref={setContainer} />
					</div>
				</Show>
			</div>
		</div>
	);
}
