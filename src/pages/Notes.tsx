import { FileTree } from "../layouts/FileTree";
import { Notepad } from "../layouts/Notepad";
import BufferLine from "../layouts/BufferLine";
import { auth } from "../config/firebase";
import { useNavigate } from "@solidjs/router";
import { NoteType, NotesProvider } from "../context/NotesProvider";
import { getNoteFromCloud } from "../lib/cloudFunc";
import { LayoutProvider } from "../context/LayoutProvider";

const Notes = () => {
	const navigate = useNavigate();
	const user = auth.currentUser;
	if (!user) {
		navigate("/signin");
		return <></>;
	}

	const getNotes = async (): Promise<NoteType[]> => {
		const user = auth.currentUser;
		const notes = await getNoteFromCloud(user!.uid);
		return notes;
	};

	// FIXME: mobile view isn't working properly
	return (
		<NotesProvider getNotes={getNotes}>
			<LayoutProvider>
				<div class="font-Source_Sans_Pro h-screen md:flex bg-slate-100">
					<FileTree />
					<div class="md:mt-6 md:rounded-md md:mb-6 md:mr-6 w-full bg-gray-100 flex flex-col h-full md:h-auto">
						<BufferLine />
						<div class="bg-white w-full h-full">
							<Notepad />
						</div>
					</div>
				</div>
			</LayoutProvider>
		</NotesProvider>
	);
};

export default Notes;
