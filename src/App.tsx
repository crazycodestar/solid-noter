import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Home } from "./pages/Home";

const App: Component = () => {
	return (
		<div class={styles.App}>
			<Home />
		</div>
	);
};

export default App;
