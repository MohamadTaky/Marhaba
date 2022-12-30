import SignIn from "components/sign-in/sign-in.component";
import SignUp from "components/sign-up/sign-up.component";
import useStore from "libraries/zustand/store";
import { useState } from "react";
import Intro from "components/intro/intro.component";
import { CircleNotch } from "phosphor-react";

export default function LandingPage() {
	const [isSignup, setIsSignup] = useState(true);
	const errorMessage = useStore(state => state.errorMessage);
	const statusMessage = useStore(state => state.statusMessage);
	const status = useStore(state => state.status);

	return (
		<>
			<Intro />
			<div className="flex flex-col w-1/2 p-8">
				{(() => {
					switch (status) {
						case "loading":
							return (
								<p className="my-auto text-center text-xl">
									{statusMessage}
									<CircleNotch className={`inline ml-2 animate-spin-fast`} size={35} />
								</p>
							);
						case "complete":
							return <p className="my-auto text-center text-xl">{statusMessage}</p>;
						default:
							return (
								<>
									{isSignup ? <SignUp /> : <SignIn />}
									<div className="mt-auto mx-auto text-center">
										<p className="mb-8 empty:opacity-0 opacity-100 transition text-red-500">{errorMessage}</p>
										{isSignup ? "Already have an account ? " : "Don't have an account ? "}
										<button
											onClick={() => {
												setIsSignup(prev => !prev);
											}}
											className="text-skin-active cursor-pointer">
											{isSignup ? "sign in" : "sign up"}
										</button>
									</div>
								</>
							);
					}
				})()}
			</div>
		</>
	);
}
