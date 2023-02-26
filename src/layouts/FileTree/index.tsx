import {
	BsPlus,
	BsChevronLeft,
	BsTrash,
	BsPencil,
	BsCheck,
} from "solid-icons/bs";
import { createResource, createSignal, For, Resource, Show } from "solid-js";
import type { NoteType, Id } from "../../pages/Notes";

interface IFileTreeProps {
	notes: Resource<NoteType[]>;
	onSelectNote: (id: Id) => void;
	onCreateNote: () => void;
	onDeleteNote: (id: Id) => void;
	onSetNoteName: (id: Id, name: string) => void;
}

export const FileTree = (props: IFileTreeProps) => {
	let inputRef: HTMLInputElement;

	return (
		<div class="fixed md:static z-50">
			<div class="absolute w-screen h-screen bg-black opacity-40 top-0 left-0 md:hidden" />
			<div class="absolute h-screen top-0 left-0 bottom-0 p-6 md:static">
				<div class="h-full bg-white w-[250px] rounded-md p-4">
					<div class="mb-2 w-full flex justify-end">
						<button class="rounded-full p-2 flex items-center bg-slate-100 hover:bg-slate-200 active:bg-slate-100 cursor-pointer justify-center">
							<BsChevronLeft size={16} />
						</button>
					</div>
					<div class="flex space-x-2 items-center border-b-2 pb-2">
						{/* add line height here */}
						<h1 class="text-lg font-lg font-semibold">Olalekan Adekanmbi</h1>
						<span class="rounded-md whitespace-nowrap cursor-pointer text-sm px-2 py-1 bg-blue-200">
							sign out
						</span>
					</div>
					<ul data-test="filetree" class="space-y-3 mt-3">
						<Show
							when={Boolean(props.notes()?.length)}
							fallback={<p>loading...</p>}
						>
							<For each={props.notes()}>
								{(note) => {
									const [value, setValue] = createSignal("");
									const [editMode, setEditMode] = createSignal(false);

									const handleEditNoteName = () => {
										setEditMode(true);
										setValue(note.filename);
										inputRef.focus();
									};

									const handleSetNoteName = () => {
										setEditMode(false);
										props.onSetNoteName(note.id, value());
										// call external set file name or something
									};
									return (
										<li
											onClick={() => props.onSelectNote(note.id)}
											class={`rounded-md justify-between capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100 ${
												note.selected ? "bg-slate-200" : ""
											}`}
										>
											<Show
												when={!editMode()}
												fallback={
													// TODO: Make the input to be rapped around a form - file name currently can be nothing
													<input
														onKeyDown={(e) =>
															e.key === "Enter" ? handleSetNoteName() : null
														}
														value={value()}
														onInput={(e) => setValue(e.currentTarget.value)}
														ref={inputRef}
														type="text"
														class="w-full"
													/>
												}
											>
												<p class="truncate">{note.filename}</p>
											</Show>
											<div class="flex space-x-2 items-center">
												<Show
													when={!editMode()}
													fallback={
														<div
															onClick={handleSetNoteName}
															class="active:bg-slate-300 rounded-full p-1.5 text-green-400"
														>
															<BsCheck size={24} />
														</div>
													}
												>
													<div
														onClick={handleEditNoteName}
														class="active:bg-slate-300 rounded-full p-1.5"
													>
														<BsPencil size={16} />
													</div>
												</Show>
												<div
													onClick={() => props.onDeleteNote(note.id)}
													class="active:bg-slate-300 rounded-full p-1.5 text-red-400"
												>
													<BsTrash size={16} />
												</div>
											</div>
										</li>
									);
								}}
							</For>
							<hr class="border-t-2" />
						</Show>
						<li
							onClick={props.onCreateNote}
							class="rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100"
							data-test="create_new_note"
						>
							<BsPlus size={24} /> <p>New Note</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
