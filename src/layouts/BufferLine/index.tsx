import {
	Accessor,
	Component,
	createEffect,
	createMemo,
	createSignal,
	For,
	on,
	Resource,
} from "solid-js";
import { FaSolidPlus, FaSolidXmark } from "solid-icons/fa";
import { NoteType } from "../../pages/Notes";
import classNames from "classnames";
import { Id } from "../../pages/Notes";

interface IBufferLineProps {
	buffers: NoteType[];
	onSelectNote: (id: Id) => void;
	onCreateNote: () => void;
	triggerSignal: Accessor<number | undefined>;
	deleteTriggerSignal: Resource<NoteType[]>;
}

const BufferLine: Component<IBufferLineProps> = (props) => {
	const [bufferArray, setBufferArray] = createSignal<NoteType[]>([]);

	createEffect(
		on(props.triggerSignal, () => {
			// selection
			const activeBuffer = props.buffers.find(({ selected }) => selected);
			if (!activeBuffer) return;

			const nextBufferArray = bufferArray().map((buffer) => ({
				...buffer,
				selected: false,
			}));

			const index = bufferArray().findIndex(({ id }) => id == activeBuffer.id);
			if (index == -1) {
				nextBufferArray.push({ ...activeBuffer });
			} else {
				nextBufferArray[index].selected = true;
			}

			setBufferArray(nextBufferArray);
		})
	);

	createEffect(
		on(props.deleteTriggerSignal, () => {
			setBufferArray((state) =>
				state.filter((buffer) =>
					Boolean(props.buffers.find(({ id }) => buffer.id == id))
				)
			);
		})
	);

	const handleCloseBuffer = (id: Id) => {
		setBufferArray((state) => state.filter((buffer) => buffer.id != id));
	};

	return (
		<div class="flex w-full items-center h-10 min-h-[40px]">
			{/* <pre>{JSON.stringify(bufferArray(), null, 2)}</pre> */}
			<For each={bufferArray()}>
				{({ filename, selected, id }, index) => {
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
						const isNextSelected = props.buffers[index() + 1]?.selected;
						return classNames(defaults, {
							"py-2": selected,
							"bg-white": selected,
							"rounded-t-md": selected,
							"border-r-2": !selected && !isNextSelected,
							"border-r-gray-400": !selected && !isNextSelected,
							"h-fit": !selected,
							"hover:bg-white/60": !selected,
							"hover:py-2": !selected,
							"hover:bg-white": !selected,
							"hover:rounded-t-md": !selected,
							"hover:border-r-transparent": !selected,
						});
					});
					return (
						<div class={variants()} onClick={() => props.onSelectNote(id)}>
							<p class="capitalize truncate">{filename}</p>
							<button
								class="hover:bg-gray-200 p-1 rounded-full"
								onClick={(e) => {
									e.stopPropagation();
									handleCloseBuffer(id);
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
				onClick={props.onCreateNote}
			>
				<FaSolidPlus />
			</button>
		</div>
	);
};

export default BufferLine;
