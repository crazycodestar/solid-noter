import { auth, db } from "../config/firebase";
import {
	collection,
	query,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	where,
} from "firebase/firestore";
import { Id, NoteType, noteDoc } from "../context/NotesProvider";

export const getNoteFromCloud = async (id: string) => {
	const notes: NoteType[] = [];
	const q = query(collection(db, "notes"), where("user", "==", id));

	const res = await getDocs(q);
	res.forEach((doc) => {
		const data = doc.data() as noteDoc;
		notes.push({
			content: data.note,
			filename: data.title,
			id: doc.id,
		});
	});

	return notes;
};

export const handleCreateNoteInCloud = async () => {
	const currentUser = auth.currentUser?.uid;
	if (!currentUser) return;

	const result = await addDoc(collection(db, "notes"), {
		note: "<p>write something here</p>",
		title: "New Note",
		user: currentUser,
	});

	return result.id as Id;
};

export const handleDeleteNoteFromCloud = async (id: Id) => {
	await deleteDoc(doc(db, "notes", id));
};

export const handleSaveNoteToCloud = async (
	id: Id,
	note: string,
	setLoading: (state: boolean) => void
) => {
	setLoading(true);
	await updateDoc(doc(db, "notes", id), {
		note: note,
	});
	setLoading(false);
};

export const handleSaveNoteNameToCloud = async (id: Id, name: string) => {
	return await updateDoc(doc(db, "notes", id), {
		title: name,
	});
};

type params = Parameters<typeof handleSaveNoteToCloud>;
export function debounce(func: (...args: params) => void, timeout = 300) {
	let timer: ReturnType<typeof setTimeout> | undefined;

	return (...args: params) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-ignore
			func.apply(this, args);
		}, timeout);
	};
}
