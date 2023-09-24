import { createTiptapEditor, useEditorHTML } from "solid-tiptap";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import {
	createEffect,
	createMemo,
	createSignal,
	JSX,
	Show,
	untrack,
	on,
} from "solid-js";
import { Toolbar } from "solid-headless";
import { ToolbarContents } from "./components/ToolbarContents";
import { useNotes } from "../../context/NotesProvider";

export function Notepad(): JSX.Element {
	const [container, setContainer] = createSignal<HTMLDivElement>();
	const [menu, setMenu] = createSignal<HTMLDivElement>();
	const { activeNoteId, handleSaveNote, notes, handleSetNoteName, isSaving } =
		useNotes();

	const content = () =>
		notes()?.find((note) => note.id === activeNoteId())?.content;
	const filename = () =>
		notes()?.find((note) => note.id === activeNoteId())?.filename;

	const editor = createMemo(
		on(activeNoteId, () => {
			return createTiptapEditor(() => ({
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
				content: untrack(content) || "",
			}));
		})
	);

	const html = useEditorHTML(() => editor()());
	createEffect(
		on(html, () => {
			const result = html();
			if (!result) return;

			if (result === content()) return;

			const noteId = activeNoteId();
			if (!noteId) return;

			handleSaveNote(noteId, result);
		})
	);

	return (
		<Show when={Boolean(activeNoteId)} fallback={<p>none selected</p>}>
			<Show when={Boolean(content())} fallback={<p>Fetching notes</p>}>
				<Toolbar
					ref={setMenu}
					class="dynamic-shadow bg-gradient-to-bl from-indigo-500 to-blue-600 text-white rounded-lg"
					horizontal
				>
					<Show when={editor()()} keyed>
						{(instance) => <ToolbarContents editor={instance} />}
					</Show>
				</Toolbar>
				<div class="pt-16 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent w-full max-h-max px-6 flex flex-col">
					<pre>{isSaving() ? "saving" : "saved"}</pre>
					<div class="flex flex-col items-center h-full">
						{/*ISSUE: resize not working for title text-area*/}
						<textarea
							cols={1}
							rows={1}
							value={filename()}
							onBlur={(e) =>
								handleSetNoteName(activeNoteId()!, e.currentTarget.value)
							}
							placeholder="Title"
							class="resize-none scrollbar-none focus:outline-none max-w-2xl w-full text-3xl mb-4 tracking-wide"
						/>
						<div
							data-test="notepad_parent"
							class="max-w-2xl w-full h-full"
							ref={setContainer}
						/>
					</div>
				</div>
			</Show>
		</Show>
	);
}
