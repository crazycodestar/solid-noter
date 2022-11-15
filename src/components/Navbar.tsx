import { SiBuymeacoffee } from "solid-icons/si";
import { BsList } from "solid-icons/bs";
import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

export const Navbar = () => {
	const navigate = useNavigate();
	const [dropdownState, setDropdownState] = createSignal<boolean>(true);
	// make dropdown true when not in mobile view
	return (
		<div class="backdrop-blur-sm h-16 fixed top-0 md:justify-between w-screen flex items-center justify-between px-8 z-50">
			<h1
				onClick={() => navigate("/")}
				class="text-2xl font-bold tracking-wider font-Source_Sans_Pro "
			>
				Noteer
			</h1>
			<BsList
				class="md:hidden"
				size={32}
				onClick={() => setDropdownState((state) => !state)}
			/>
			<Show when={dropdownState()}>
				<div class="absolute md:static md:items-center md:bg-transparent  z-0 bg-white top-16 md:w-fit md:flex left-0 pb-4 pt-2 backdrop-blur-sm">
					<ul class="flex md:space-x-4 md:space-y-0 md:w-fit space-y-2 items-center text-center w-screen px-8 flex-col md:flex-row">
						<li class="cursor-pointer px-2 py-1 rounded-md bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-500 w-full md:w-fit h-12 items-center flex md:h-auto m-0">
							<button class="flex space-x-1 items-center">
								<span>
									<SiBuymeacoffee size={16} />
								</span>
								<p class="capitalize">buy me a coffee</p>
							</button>
						</li>
						<li
							onClick={() => navigate("/notebook")}
							class="cursor-pointer px-4 py-2 rounded-md hover:bg-slate-300 capitalize active:bg-transparent w-full h-12 items-center flex md:w-fit md:h-auto"
						>
							<p>Notes</p>
						</li>

						<li class="cursor-pointer px-4 py-2 rounded-md bg-blue-400 text-white capitalize active:bg-blue-400 hover:bg-blue-300 w-full h-12 items-center flex md:w-fit md:h-auto">
							<p>sign in</p>
						</li>
					</ul>
				</div>
			</Show>
		</div>
	);
};
