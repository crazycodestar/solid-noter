import { createMemo, createSignal, For, Show, untrack } from "solid-js";
import { FileTree } from "../layouts/FileTree";
import { Notepad } from "../layouts/Notepad";
import produce from "immer";
import BufferLine from "../layouts/BufferLine";

const PLACEHOLDER = "<P> Start Writing Here </p>";

export type NoteType = {
  filename: string;
  content: string;
  id: number;
  selected: boolean;
};

export type ExtractType<T, K extends keyof T> = T[K];
export type Id = ExtractType<NoteType, "id">;

const NOTES = [
  {
    id: 0,
    filename: "get started",
    content: PLACEHOLDER,
  },
];

const Notes = () => {
  const initNotes: NoteType[] = NOTES.map((note) => ({
    ...note,
    selected: false,
  }));
  // TODO: convert from createSignal to createStore or use Zustand anyone
  const [notes, setNotes] = createSignal<NoteType[]>(initNotes);
  const [indexPos, setIndexPos] = createSignal<number>(notes().length);

  const handleSelectNote = (id: Id) => {
    const noteId = notes().findIndex((note) => note.id === id);
    if (noteId === -1) return;

    const newNotes = notes().map(note => ({ ...note, selected: false }));
    newNotes[noteId].selected = true;

    setNotes(newNotes);

  };

  const handleCreateNote = () => {
    setNotes((init) => [
      ...init.map((note) => ({ ...note, selected: false })),
      {
        id: indexPos(),
        content: PLACEHOLDER,
        filename: "Untitled",
        selected: true,
      },
    ]);
    setIndexPos(init => init + 1);
  };

  const handleDeleteNote = (id: Id) => {
    setNotes((init) => init.filter((note) => note.id !== id));
  };

  const handleSetNoteName = (id: Id, name: string) => {
    const index = notes().findIndex((note) => note.id === id);
    if (index === -1) return;

    const nextState = produce<NoteType[]>((draft = notes()) => {
      draft[index].filename = name;
    });
    // TODO: make check if the state is properly immutable and not just duplicating the entire thing
    setNotes((state) => nextState(state));
  };

  const handleSaveNote = (id: Id, note: string) => {
    const index = notes().findIndex((note) => note.id === id);
    if (index === -1) return;

    const nextState = produce<NoteType[]>((draft = notes()) => {
      draft[index].content = note;
    });
    // TODO: make check if the state is properly immutable and not just duplicating the entire thing
    setNotes((state) => nextState(state));
  };

  const note = () => notes().find((note) => note.selected === true);
  const triggerSignal = () => createMemo(() => {
    return notes().findIndex(note => note.selected);
  })

  return (
    <div class="font-Source_Sans_Pro h-screen md:flex bg-slate-100">
      {/* <pre>{JSON.stringify(notes(), null, 2)}</pre> */}
      <FileTree
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        onSetNoteName={handleSetNoteName}
        notes={notes()}
      />
      {/* TODO: create a git:branch where the notes can be stacked on each other */}
      {/* <For each={notes()}> */}
      {/*   {(note) => { */}
      {/*     return ( */}
      {/*       <> */}
      {/*         {/1* <Show when={note.selected}> *1/} */}
      {/*         <Notepad note={note} onSaveNote={(content) => handleSaveNote(note.id, content)} onUpdateTitle={(title) => handleUpdateTitle(note.id, title)} /> */}
      {/*         {/1* </Show> *1/} */}
      {/*       </> */}
      {/*     ) */}
      {/*   }} */}
      {/* </For> */}
      <div class="md:mt-6 md:rounded-md md:mb-6 md:mr-6 w-full bg-gray-100 flex flex-col">
        <BufferLine buffers={notes()} onSelectNote={handleSelectNote} onCreateNote={handleCreateNote} triggerSignal={triggerSignal()} deleteTriggerSignal={notes} />
        <div class="bg-white w-full h-full">
          <Show when={Boolean(note())}>
            <Notepad triggerSignal={triggerSignal()} note={note()!} onSaveNote={(content) => handleSaveNote(note()!.id, content)} onUpdateFilename={(title) => handleSetNoteName(note()!.id, title)} />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Notes;
