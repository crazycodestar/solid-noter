import { BsPlus, BsChevronLeft } from "solid-icons/bs";

export const FileTree = () => {
	return (
		<>
			<div class="w-screen h-screen bg-black opacity-40 fixed top-0 left-0" />
			<div class="fixed h-full top-0 left-0 bottom-0 p-6">
				<div class="h-full min-w-[250px] bg-white rounded-md p-4">
					<div class="mb-2 w-full flex justify-end">
						<button class="rounded-full p-2 flex items-center bg-slate-100 hover:bg-slate-200 active:bg-slate-100 cursor-pointer justify-center">
							<BsChevronLeft size={16} />
						</button>
					</div>
					<div class="flex space-x-2 items-baseline border-b-2 pb-2">
						{/* add line height here */}
						<h1 class="text-lg font-lg font-semibold">Olalekan Adekanmbi</h1>
						<span class="rounded-md cursor-pointer text-sm px-2 py-1 bg-blue-200">
							sign out
						</span>
					</div>
					<ul class="space-y-3 mt-3">
						<li class="bg-slate-200 rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100">
							file 1
						</li>
						<li class="rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100">
							file 1
						</li>
						<li class="rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100">
							file 1
						</li>
						<li class="rounded-md capitalize cursor-pointer p-2 space-x-2 flex items-center hover:bg-slate-100">
							file 1
						</li>
						<li class="rounded-md capitalize cursor-pointer p-2 border-t-2 space-x-2 flex items-center hover:bg-slate-100">
							<BsPlus size={24} /> <p>New Note</p>
						</li>
					</ul>
				</div>
			</div>
			;
		</>
	);
};
