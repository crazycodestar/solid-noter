import { BsPlus, BsChevronLeft } from "solid-icons/bs";
import { For } from "solid-js";
import type { NoteType, Id } from "../../pages/Notes";

interface IFileTreeProps {
	notes: NoteType[];
	selectNote: (id: Id) => void;
	createNote: () => void;
	deleteNote: (id: Id) => void;
}

export const FileTree = (props: IFileTreeProps) => {
	return (
		<div class="fixed md:static z-50">
			<div class="absolute w-screen h-screen bg-black opacity-40 top-0 left-0 md:hidden" />
			<div class="absolute h-screen top-0 left-0 bottom-0 p-6 md:static">
				<div class="h-full min-w-[250px] bg-white rounded-md p-4">
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
					<ul class="space-y-3 mt-3">
						<For each={props.notes}>
							{(note) => {
								return (
									<li
										onClick={() => props.selectNote(note.id)}
										class={`rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100 ${
											note.selected ? "bg-slate-200" : ""
										}`}
									>
										{note.filename}
									</li>
								);
							}}
						</For>
						<hr class="border-t-2" />
						<li
							onClick={props.createNote}
							class="rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100"
						>
							<BsPlus size={24} /> <p>New Note</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
