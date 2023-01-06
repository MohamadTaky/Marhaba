import SignIn from "components/sign-in/sign-in.component";
import SignUp from "components/sign-up/sign-up.component";
import useStore from "libraries/zustand/store";
import Intro from "components/intro/intro.component";
import { t } from "i18next";
import useToggle from "hooks/useToggle";
import LoadingSpinner from "components/loading-spinner/loading-spinner";

export default function LandingPage() {
	const errorMessage = useStore(state => state.errorMessage);
	const statusMessage = useStore(state => state.statusMessage);
	const status = useStore(state => state.status);
	const { value: isSignUp, toggle: toggleSignUp } = useToggle(true);
	return (
		<div className="md:flex">
			<Intro />
			<div className="h-screen flex flex-col p-8 md:w-1/2">
				{(() => {
					switch (status) {
						case "loading":
							return <LoadingSpinner loadingMessage={t(statusMessage)} />;
						default:
							return (
								<>
									{isSignUp ? <SignUp /> : <SignIn />}
									<div className="mt-auto mx-auto text-center">
										<p className="mb-8 empty:opacity-0 opacity-100 transition text-red-500">
											{t(errorMessage)}
										</p>
										{t(isSignUp ? "already have an account ?" : "don't have an account ?")}
										<button onClick={toggleSignUp} className="text-skin-active cursor-pointer">
											{t(isSignUp ? "sign in" : "sign up")}
										</button>
									</div>
								</>
							);
					}
				})()}
			</div>
		</div>
	);
}
