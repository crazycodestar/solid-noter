import { createSignal } from "solid-js";
import { FileTree } from "../layouts/FileTree";
import { Notepad } from "../layouts/Notepad";
import produce from "immer";

const PLACEHOLDER = "<P> Start Writing Here </p>";

export type NoteType = {
	filename: string;
	note: {
		title: string;
		content: string;
	};
	id: number;
	selected: boolean;
};

export type ExtractType<T, K extends keyof T> = T[K];
export type Id = ExtractType<NoteType, "id">;

const NOTES = [
	{
		id: 0,
		filename: "file 1",
		note: {
			title: "",
			content: PLACEHOLDER,
		},
	},
];

const Notes = () => {
	const initNotes: NoteType[] = NOTES.map((note) => ({
		...note,
		selected: false,
	}));

	// TODO: convert from createSignal to createStore or use Zustand anyone
	const [notes, setNotes] = createSignal<NoteType[]>(initNotes);

	// const selectNote = (id: Id) =>
	// 	setNotes((init) => {
	// 		return produce<NoteType[]>((init, draft) => {
	// 			const note = draft.find((note) => note.id === id);
	// 			if (!note) return;
	// 			note.selected = true;
	// 		})();
	// 	});

	const handleSelectNote = (id: Id) => {
		const noteId = notes().findIndex((note) => note.id === id);
		if (noteId === -1) return;
		return setNotes((init) => {
			const newState = init.map((notes) => ({ ...notes, selected: false }));

			const newNote = { ...newState[noteId], selected: true };
			newState[noteId] = newNote;

			return newState;
		});
	};

	const handleCreateNote = () => {
		setNotes((init) => [
			...init.map((note) => ({ ...note, selected: false })),
			{
				id: init.length,
				colorTag: "#fff000",
				note: {
					title: "",

					content: PLACEHOLDER,
				},
				filename: "New File",
				selected: true,
			},
		]);
	};

	const handleDeleteNote = (id: Id) => {
		setNotes((init) => init.filter((note) => note.id !== id));
	};

	const updateNote = (
		id: Id,
		newVal: { [T in keyof NoteType]: ExtractType<NoteType, T> }
	) => {
		setNotes((init) => {
			return produce<NoteType[]>((init, draft) => {
				const note = draft.find((note) => note.id === id);
				if (!note) return;
				Object.assign(note, newVal);
			})();
		});
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

	const note = () => notes().find((note) => note.selected === true);

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
			<Notepad note={note()} updateNote={updateNote} />
		</div>
	);
};

export default Notes;
