import { FileTree } from "../layouts/FileTree";
import { Notepad } from "../layouts/Notepad";

export const Notes = () => {
	return (
		<div class="h-screen md:flex bg-slate-100">
			<FileTree />
			<Notepad />
		</div>
	);
};
