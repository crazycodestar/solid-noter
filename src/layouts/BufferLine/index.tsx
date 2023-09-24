import { createMemo, For } from "solid-js";
import { FaSolidPlus, FaSolidXmark, FaSolidBars } from "solid-icons/fa";
import classNames from "classnames";
import { useNotes } from "../../context/NotesProvider";
import { useLayout } from "../../context/LayoutProvider";

const BufferLine = () => {
	const {
		buffers,
		activeNoteId,
		handleCreateNote,
		handleRemoveFromBufferLine,
		notes,
		handleSelectNote,
	} = useNotes();
	const { toggleSideBar } = useLayout();
	return (
		<div class="flex w-full items-center h-10 min-h-[40px]">
			{/* <pre>{JSON.stringify(bufferArray(), null, 2)}</pre> */}
			<button
				class="rounded-sm p-2 ml-2 hover:bg-gray-300 md:hidden"
				onClick={toggleSideBar}
			>
				<FaSolidBars />
			</button>
			<For each={buffers()}>
				{(noteId, index) => {
					const note = () => notes()?.find((note) => note.id === noteId);
					if (!note) return;

					const bufferLine = () => note()?.id === activeNoteId();

					const variants = createMemo(() => {
						const defaults = [
							"w-[150px]",
							"cursor-pointer",
							"flex",
							"items-center",
							"justify-between",
							"px-3",
							"ease-out",
							"duration-300",
						];
						// const isNextSelected = props.buffers[index() + 1]?.selected;
						return classNames(defaults, {
							"py-2": bufferLine(),
							"bg-white": bufferLine(),
							"rounded-t-md": bufferLine(),
							// "border-r-2": !bufferLine() && !isNextSelected,
							// "border-r-gray-400": !bufferLine() && !isNextSelected,
							"h-fit": !bufferLine(),
							"hover:bg-white/60": !bufferLine(),
							"hover:py-2": !bufferLine(),
							"hover:bg-white": !bufferLine(),
							"hover:rounded-t-md": !bufferLine(),
							"hover:border-r-transparent": !bufferLine(),
						});
					});

					const handleSelectNoteById = () => {
						const id = note()?.id;
						if (!id) return;
						handleSelectNote(id);
					};

					return (
						<div class={variants()} onClick={handleSelectNoteById}>
							<p class="capitalize truncate">{note()?.filename}</p>
							<button
								type="button"
								class="hover:bg-gray-200 p-1 rounded-full"
								onClick={(e) => {
									e.stopPropagation();
									const id = note()?.id;
									id ? handleRemoveFromBufferLine(id) : null;
									// handleCloseBuffer(id);
								}}
							>
								<FaSolidXmark />
							</button>
						</div>
					);
				}}
			</For>
			<button
				class="rounded-full p-2 ml-2 hover:bg-gray-300"
				onClick={handleCreateNote}
			>
				<FaSolidPlus />
			</button>
		</div>
	);
};

export default BufferLine;
