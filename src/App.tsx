import type { Component } from "solid-js";
import { Home } from "./pages/Home";
import { Notes } from "./pages/Notes";

const App: Component = () => {
	return (
		<div>
			{/* <Home /> */}
			<Notes />
		</div>
	);
};

export default App;
