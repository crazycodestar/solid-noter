import { createTiptapEditor, useEditorHTML } from "solid-tiptap";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { createEffect, createMemo, createSignal, JSX, Show, untrack, on, Accessor } from "solid-js";
import { Toolbar } from "solid-headless";
import { ToolbarContents } from "./components/ToolbarContents";
import { NoteType } from "../../pages/Notes";

interface INotepadProps {
  onUpdateFilename: (title: string) => void;
  onSaveNote: (note: string) => void;
  note: NoteType;
  triggerSignal: Accessor<number>;
}

export function Notepad(props: INotepadProps): JSX.Element {
  const [container, setContainer] = createSignal<HTMLDivElement>();
  const [menu, setMenu] = createSignal<HTMLDivElement>();

  const content = () => props.note?.content;
  const editor = createMemo(on(props.triggerSignal, () => {
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
    })
    )
  }))

  const html = useEditorHTML(() => editor()());
  createEffect(() => {
    const result = html()
    if (result) props.onSaveNote(result);
  })

  return (
    <>
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
        <div class="flex flex-col items-center h-full">
          {/*ISSUE: resize not working for title text-area*/}
          <textarea
            cols={1}
            rows={1}
            value={props.note.filename}
            onInput={e => props.onUpdateFilename(e.currentTarget.value)}
            placeholder="Title"
            class="resize-none scrollbar-none focus:outline-none max-w-2xl w-full text-3xl mb-4 tracking-wide"
          />
          <div data-test="notepad_parent" class="max-w-2xl w-full h-full" ref={setContainer} />
        </div>
      </div>
    </>
  );
}
