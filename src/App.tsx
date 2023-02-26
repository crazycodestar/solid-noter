import { Component, lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";

const Home = lazy(() => import("./pages/Home"));
const Notes = lazy(() => import("./pages/Notes"));
const SignIn = lazy(() => import("./pages/SignIn"));

const App: Component = () => {
	return (
		<Routes>
			<Route path="/" component={Home} />
			<Route path="/notebook" component={Notes} />
			<Route path="/signin" component={SignIn} />
		</Routes>
	);
};

export default App;
