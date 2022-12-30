import { handleSignUp } from "libraries/firebase/firebase.utils";
import Button from "components/button/button.component";
import Input from "components/input/input.component";
import PasswordInput from "components/inputs/password-field.component";
import useStore from "libraries/zustand/store";
import { useFirestore } from "reactfire";

export default function SignUp() {
	const setErrorMessage = useStore(state => state.setErrorMessage);
	const setStatusMessage = useStore(state => state.setStatusMessage);
	const setStatus = useStore(state => state.setStatus);
	const firestore = useFirestore();

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={e => handleSignUp(e, setStatus, setStatusMessage, setErrorMessage, firestore)}>
			<Input id="sign-up-username" label="User name" />
			<Input id="sign-up-email" type="email" label="Email" />
			<PasswordInput id="sign-up-password" label="Password" />
			<PasswordInput id="sign-up-confirm-password" label="Confirm password" />
			<Button type="submit">Sign up</Button>
		</form>
	);
}
