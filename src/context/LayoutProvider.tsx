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

type LayoutContext = {
	isSideBarOpen: () => boolean;
	toggleSideBar: () => void;
};

const defaultValues: LayoutContext = {
	isSideBarOpen: () => false,
	toggleSideBar: () => {},
};
const LayoutContext = createContext<LayoutContext>(defaultValues);

interface LayoutProviderProps {
	children: JSX.Element;
}

export function LayoutProvider(props: LayoutProviderProps) {
	const [isSideBarOpen, setIsSideBarOpen] = createSignal(false);

	const handleToggleSideBar = () => setIsSideBarOpen((state) => !state);

	return (
		<LayoutContext.Provider
			value={{
				isSideBarOpen: () => isSideBarOpen(),
				toggleSideBar: handleToggleSideBar,
			}}
		>
			{props.children}
		</LayoutContext.Provider>
	);
}

export function useLayout() {
	return useContext(LayoutContext);
}
