import {
	createSignal,
	createContext,
	useContext,
	JSX,
	createResource,
} from "solid-js";
import {
	handleCreateNoteInCloud,
	handleDeleteNoteFromCloud,
	handleSaveNoteNameToCloud,
	handleSaveNoteToCloud,
} from "../lib/cloudFunc";
import { debounce } from "../lib/cloudFunc";

type NotesContext = {
	activeNoteId: () => string | undefined;
	isLoading: boolean;
	notes: () => NoteType[] | undefined;
	handleSaveNote: (id: Id, note: string) => void;
	handleSetNoteName: (id: Id, name: string) => void;
	handleSelectNote: (id: Id) => void;
	handleDeleteNote: (id: Id) => void;
	handleCreateNote: () => void;
	handleAddToBufferLine: (id: Id) => void;
	handleRemoveFromBufferLine: (id: Id) => void;
	buffers: () => string[];
	isSaving: () => boolean;
};

const PLACEHOLDER = "<P> Start Writing Here </p>";

const defaultValues: NotesContext = {
	buffers: () => [],
	activeNoteId: () => undefined,
	isLoading: true,
	isSaving: () => false,
	notes: () => undefined,
	handleCreateNote() {},
	handleDeleteNote(id) {},
	handleSelectNote(id) {},
	handleSetNoteName(id, name) {},
	handleSaveNote: (id, note) => {},
	handleAddToBufferLine: (id) => {},
	handleRemoveFromBufferLine: (id) => {},
};
const NotesContext = createContext<NotesContext>(defaultValues);

export type NoteType = {
	filename: string;
	content: string;
	id: string;
	debounce?: NodeJS.Timeout;
};

export type ExtractType<T, K extends keyof T> = T[K];
export type Id = ExtractType<NoteType, "id">;
export type noteDoc = { user: string; title: string; note: string };

interface NotesProviderProps {
	getNotes: () => Promise<NoteType[]>;
	children: JSX.Element;
}

export function NotesProvider(props: NotesProviderProps) {
	const [isSaving, setIsSaving] = createSignal(false);
	const [activeNoteId, setActiveNoteId] = createSignal<Id | undefined>();
	const [bufferLine, setBufferLine] = createSignal<Id[]>([]);
	const [defaultNotes, { mutate, refetch }] = createResource<NoteType[]>(
		props.getNotes
	);

	const TIME_TO_SAVE = 1000;
	type UpdateNoteParams = Parameters<typeof handleSaveNoteToCloud>;
	const updateNote = debounce(
		(...args: UpdateNoteParams) => void handleSaveNoteToCloud(...args),
		TIME_TO_SAVE
	);

	const handleSaveNote = (id: Id, note: string) => {
		mutate((init) => {
			if (!init) return;

			const index = init.findIndex((note) => note.id === id);
			if (index === -1 || index === undefined) return;

			const newNotes = [...init];
			const newNote = { ...newNotes[index], content: note };
			newNotes[index] = newNote;

			return newNotes;
		});
		updateNote(id, note, setIsSaving);
	};

	const handleSetNoteName = async (id: Id, name: string) => {
		const res = await handleSaveNoteNameToCloud(id, name);
		console.log(res);
		mutate((init) => {
			if (!init) return;
			const index = init.findIndex((note) => note.id === id);
			if (index === -1 || index === undefined) return;

			const newNotes = [...init];
			const newNote = { ...newNotes[index], filename: name };
			newNotes[index] = newNote;

			return newNotes;
		});
		// debounce(handleSaveNoteToCloud, id);
	};

	const handleAddToBufferLine = (id: Id) =>
		void setBufferLine((init) => [...init, id]);
	const handleRemoveFromBufferLine = (id: Id) => {
		if (activeNoteId() === id) {
			const currentIndex = bufferLine().findIndex((buffer) => buffer === id);
			if (currentIndex > 0) {
				const prevBuffer = bufferLine()[currentIndex - 1];
				setActiveNoteId(prevBuffer);
			} else if (bufferLine().length) {
				const nextBuffer = bufferLine()[currentIndex + 1];
				setActiveNoteId(nextBuffer);
			} else {
				setActiveNoteId("");
			}
		}
		void setBufferLine((init) => init.filter((buffer) => buffer !== id));
	};

	const handleDeleteNote = async (id: Id) => {
		handleRemoveFromBufferLine(id);
		await handleDeleteNoteFromCloud(id);
		refetch();
	};

	const handleCreateNote = async () => {
		const id = await handleCreateNoteInCloud();
		if (!id) return;

		refetch();
		// FIXME: handleSelecteNote is causing the ui to glitch.
		handleSelectNote(id);
	};

	const handleSelectNote = (id: Id) => {
		setActiveNoteId(id);
		const isInBufferLine = bufferLine().find((buffer) => buffer === id);
		if (!isInBufferLine) handleAddToBufferLine(id);
	};

	const notes = () => defaultNotes();
	const activeNoteIdValue = () => activeNoteId();
	const buffers = () => bufferLine();
	const isSavingState = () => isSaving();

	return (
		<NotesContext.Provider
			value={{
				notes,
				buffers,
				activeNoteId: activeNoteIdValue,
				isLoading: defaultNotes.loading,
				isSaving: isSavingState,
				handleSaveNote,
				handleSetNoteName,
				handleCreateNote,
				handleDeleteNote,
				handleSelectNote,
				handleAddToBufferLine,
				handleRemoveFromBufferLine,
			}}
		>
			{/* <pre>
				{JSON.stringify(
					{
						buffers: buffers(),
						notes: notes(),
						loading: defaultNotes.loading,
						activeNoteId: activeNoteIdValue() + " hey",
					},
					null,
					2
				)}
			</pre> */}
			{props.children}
		</NotesContext.Provider>
	);
}

export function useNotes() {
	return useContext(NotesContext);
}
