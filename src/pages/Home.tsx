import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { BsGithub, BsTwitter } from "solid-icons/bs";
import { SiBuymeacoffee } from "solid-icons/si";
import { useNavigate } from "@solidjs/router";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Navbar />
			<div class="h-screen flex items-center relative justify-center">
				<div class="pattern_background w-full h-full absolute top-0 left-0 -z-10" />
				<div class="px-8 flex items-center flex-col">
					<h1 class="text-3xl max-w-[800px] line leading-snug text-center font-bold capitalize mb-8 font-Source_Sans_Pro">
						Welcome to{" "}
						<span class="rounded-md bg-slate-300 tracking-wider font-semibold bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text">
							Noteer
						</span>
						. An award winning app for putting down your thoughts
					</h1>
					<div class="space-x-2">
						<Button variant="frosted" onClick={() => navigate("/signin")}>
							Sign in
						</Button>
						<Button
							onClick={() => navigate("/notebook")}
							variant="frosted-primary"
						>
							I need to write now 😫
						</Button>
					</div>
				</div>
				{/* resources used */}
				<div class="absolute bottom-10 right-10 flex space-x-4">
					<a
						href="https://github.com/crazycodestar/solid-noter"
						class="shadow-md cursor-pointer rounded-full w-10 flex items-center justify-center h-10 border-solid bg-white border-2 border-slate-900"
					>
						<BsGithub size={24} />
					</a>
					<a
						href="https://twitter.com/_itslekan"
						class="shadow-md cursor-pointer rounded-full w-10 flex items-center justify-center h-10 border-solid bg-white border-2 border-slate-900"
					>
						<BsTwitter size={24} />
					</a>
					<a class="shadow-md rounded-full cursor-pointer w-10 flex items-center justify-center h-10 border-solid bg-white border-2 border-slate-900">
						<SiBuymeacoffee size={24} />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Home;
