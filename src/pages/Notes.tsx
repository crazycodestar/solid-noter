import {
	Accessor,
	createMemo,
	createResource,
	createSignal,
	For,
	Show,
	untrack,
} from "solid-js";
import { FileTree } from "../layouts/FileTree";
import { Notepad } from "../layouts/Notepad";
import produce from "immer";
import BufferLine from "../layouts/BufferLine";
import { db } from "../config/firebase";
import { collection, getDocs, query } from "firebase/firestore";

const PLACEHOLDER = "<P> Start Writing Here </p>";

export type NoteType = {
	filename: string;
	content: string;
	id: string;
	selected: boolean;
};

export type ExtractType<T, K extends keyof T> = T[K];
export type Id = ExtractType<NoteType, "id">;
export type noteDoc = { user: string; title: string; note: string };

const Notes = () => {
	// TODO: convert from createSignal to createStore or use Zustand anyone
	const getNotes = async (): Promise<NoteType[]> => {
		const q = query(collection(db, "notes"));
		const notes: NoteType[] = [];
		(await getDocs(q)).forEach((doc) => {
			const data = doc.data() as noteDoc;
			notes.push({
				content: data.note,
				filename: data.title,
				id: data.user,
				selected: false,
			});
		});
		notes[0].selected = true;
		// const results = (await getDocs(q)) as unknown as noteDoc[];
		return notes;
	};
	const [notes, { mutate, refetch }] = createResource<NoteType[]>(getNotes);
	// const [notes, setNotes] = createSignal<NoteType[]>(initNotes);

	const handleSaveNameToCloud = (id: Id) => {
		// TODO: updatee the name on the cloud
	};

	const handleSaveNoteToCloud = (id: Id) => {
		// TODO: update the note on the cloud
	};

	// TODO: debounce function;
	const debounce = (func: () => void) => {
		return () => {
			const TIMEOUT = 3000;
			let triggerUpload: NodeJS.Timeout | undefined;
			const startDebounce = () => {
				triggerUpload = setTimeout(func, TIMEOUT);
			};

			const resetDebounce = () => {
				if (triggerUpload) clearTimeout(triggerUpload);
				triggerUpload = setTimeout(func, TIMEOUT);
			};

			return {
				startDebounce,
				resetDebounce,
			};
		};
	};

	const handleSelectNote = (id: Id) => {
		const noteId = notes()?.findIndex((note) => note.id === id);
		if (noteId === -1 || noteId === undefined) return;

		const newNotes = notes()?.map((note) => ({ ...note, selected: false }));
		if (!newNotes) return;
		newNotes[noteId].selected = true;

		// TODO: Rather than mutating note in the frontend how about mutating in backend and refetching. or after frontend mutation send mutation to backend
		// might be potentially out of sync but it's fine -_-
		mutate(newNotes);
	};

	const handleCreateNote = () => {
		mutate((init) => {
			const deselectedNotes = init?.map((note) => ({
				...note,
				selected: false,
			}));
			const newNotes: NoteType[] = [
				{
					id: Math.random().toString(),
					content: PLACEHOLDER,
					filename: "Untitled",
					selected: true,
				},
			];
			if (!deselectedNotes) return newNotes;
			return deselectedNotes.concat(newNotes);
		});
		// TODO: call handleSaveNoteToCloud || maybe handleCreateNoteInCloud func
	};

	const handleDeleteNote = (id: Id) => {
		mutate((init) => init?.filter((note) => note.id !== id) || []);
		// TODO: call handleDeleteNoteInCloud
	};

	const handleSetNoteName = (id: Id, name: string) => {
		const index = notes()?.findIndex((note) => note.id === id);
		if (index === -1 || index === undefined) return;

		const nextState = produce<NoteType[]>((draft = notes() || []) => {
			draft[index].filename = name;
		});
		// TODO: make check if the state is properly immutable and not just duplicating the entire thing
		mutate((state) => nextState(state));
		// TODO: call handleSaveNameToCloud func
	};

	const handleSaveNote = (id: Id, note: string) => {
		const index = notes()?.findIndex((note) => note.id === id);
		if (index === -1 || index === undefined) return;

		const nextState = produce<NoteType[]>((draft = notes() || []) => {
			draft[index].content = note;
		});
		// TODO: make check if the state is properly immutable and not just duplicating the entire thing
		mutate((state) => nextState(state));
		// TODO: call handleSaveNoteToCloud func
	};

	const note = () => {
		return notes()?.find((note) => note.selected === true);
	};
	const triggerSignal = (): Accessor<number | undefined> =>
		createMemo(() => {
			const result = notes()?.findIndex((note) => note.selected);
			return result;
		});

	return (
		<div class="font-Source_Sans_Pro h-screen md:flex bg-slate-100">
			{/* <pre>{JSON.stringify(notes(), null, 2)}</pre> */}
			<FileTree
				onSelectNote={handleSelectNote}
				onCreateNote={handleCreateNote}
				onDeleteNote={handleDeleteNote}
				onSetNoteName={handleSetNoteName}
				notes={notes}
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
				<BufferLine
					buffers={notes() || []}
					onSelectNote={handleSelectNote}
					onCreateNote={handleCreateNote}
					triggerSignal={triggerSignal()}
					deleteTriggerSignal={notes}
				/>
				<div class="bg-white w-full h-full">
					<Show when={Boolean(note())}>
						<Notepad
							note={note()!}
							triggerSignal={triggerSignal()}
							onSaveNote={(content) => handleSaveNote(note()!.id, content)}
							onUpdateFilename={(title) => handleSetNoteName(note()!.id, title)}
						/>
					</Show>
				</div>
			</div>
		</div>
	);
};

export default Notes;
