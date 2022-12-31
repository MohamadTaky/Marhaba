import { handleSignUp } from "libraries/firebase/firebase.utils";
import Button from "components/button/button.component";
import Input from "components/input/input.component";
import PasswordInput from "components/inputs/password-field.component";
import useStore from "libraries/zustand/store";
import { useFirestore } from "reactfire";
import { t } from "i18next";

export default function SignUp() {
	const setErrorMessage = useStore(state => state.setErrorMessage);
	const setStatusMessage = useStore(state => state.setStatusMessage);
	const setStatus = useStore(state => state.setStatus);
	const firestore = useFirestore();

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={e => handleSignUp(e, setStatus, setStatusMessage, setErrorMessage, firestore)}>
			<Input id="sign-up-username" name="username" label={t("user name")} />
			<Input id="sign-up-email" name="email" type="email" label={t("email")} />
			<PasswordInput id="sign-up-password" name="password" label={t("password")} />
			<PasswordInput
				id="sign-up-confirm-password"
				name="confirmPassword"
				label={t("confirm password")}
			/>
			<Button type="submit">{t("sign up")}</Button>
		</form>
	);
}
