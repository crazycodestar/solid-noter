import { FileTree } from "../layouts/FileTree";
import { Notepad } from "../layouts/Notepad";

const FILES = [
	{
		filename: "file 1",
		content: "<P> Start Writing Here </p>",
		colorTag: "#ff0000",
	},
];

export const Notes = () => {
	return (
		<div class="font-Source_Sans_Pro h-screen md:flex bg-slate-100">
			<FileTree />
			<Notepad />
		</div>
	);
};
