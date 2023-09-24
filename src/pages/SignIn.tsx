import { createFormActions, Errors } from "solid-form-action";
import { Button } from "../components/Button";
import FormInput from "../components/FormInput";
import { BsGoogle } from "solid-icons/bs";
import { useNavigate } from "@solidjs/router";
import { auth, googleProvider } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { createSignal, Show } from "solid-js";

const SignIn = () => {
	const navigate = useNavigate();
	type Auth = "sign in" | "sign up";
	const [state, setState] = createSignal<Auth>("sign in");
	const [topLevelError, setTopLevelError] = createSignal<string>("");
	const {
		actions: { email, password },
		form,
		formState,
		errors,
		reset,
	} = createFormActions({
		initialValues: {
			email: "olamilekanadekanmbi@gmail.com",
			password: "12345.adf",
			username: "olalekan",
		},
		validate: (values) => {
			const errs: Errors<typeof values> = {};
			// TODO: Email and password validation
			if (values.email.length === 0) {
				errs.email = "Email is required";
			}
			if (values.password.length < 8 || values.password.length > 16) {
				errs.password = "password should be 8-16 characters";
			}
			return errs;
		},
		onSubmit: async (values) => {
			try {
				if (state() === "sign up") {
					const result = await createUserWithEmailAndPassword(
						auth,
						values.email,
						values.password
					);
					navigate("/notebook");
				}
				if (state() === "sign in") {
					await signInWithEmailAndPassword(auth, values.email, values.password);
					navigate("/notebook");
				}
			} catch (err) {
				if (err instanceof FirebaseError) {
					return setTopLevelError(err.code.split("/")[1].split("-").join(" "));
				}
				console.error(err);
			}
		},
	});

	const handleGoogleAuth = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			console.log(token, user);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div class="flex items-center justify-center w-full h-screen ">
			<div class="backdrop-blur-sm h-16 fixed top-0 md:justify-between w-screen flex items-center justify-between px-8 z-50">
				<h1
					onClick={() => navigate("/")}
					class="text-2xl font-bold tracking-wider font-Source_Sans_Pro cursor-pointer"
				>
					Noteer
				</h1>
			</div>
			<div class="w-full max-w-xl p-12 mx-5 shadow-md rounded-md">
				<div class="mb-4">
					<h2 class="text-3xl font-bold font-Montserrat capitalize">
						{state()}
					</h2>
					<Show when={Boolean(topLevelError)}>
						<p class="text-red-500">{topLevelError}</p>
					</Show>
				</div>
				<form use:form>
					<div class="mb-4">
						<Show when={state() === "sign up"}>
							<FormInput
								error={errors.username}
								placeholder="Username"
								ref={email}
								value={formState.username}
							/>
						</Show>
						<FormInput
							error={errors.email}
							placeholder="Email Address"
							type="email"
							ref={email}
							value={formState.email}
						/>
						<FormInput
							error={errors.password}
							placeholder="Password"
							ref={password}
							type="password"
							value={formState.password}
						/>
					</div>
					<Show
						when={state() === "sign in"}
						fallback={
							<div class="flex w-full justify-end mb-2">
								<p>already have an account?</p>
								<span
									onClick={() => setState("sign in")}
									class="text-blue-400 ml-1 cursor-pointer active:text-blue-300"
								>
									sign in
								</span>
							</div>
						}
					>
						<div class="flex w-full justify-end mb-2">
							<p>don't have an account?</p>
							<span
								onClick={() => setState("sign up")}
								class="text-blue-400 ml-1 cursor-pointer active:text-blue-300"
							>
								sign up
							</span>
						</div>
					</Show>
					<Button width="long">Log in</Button>
				</form>
				<div class="flex w-full items-center my-1">
					<hr class="w-full" />
					<span class="mx-4">or</span>
					<hr class="w-full" />
				</div>
				<button
					onClick={handleGoogleAuth}
					class="flex w-full px-3 py-2 items-center gap-2 justify-center hover:bg-slate-300 active:bg-slate-300 rounded-md shadow-md"
				>
					<BsGoogle />
					<span>Sign in with Google</span>
				</button>
			</div>
		</div>
	);
};

export default SignIn;
