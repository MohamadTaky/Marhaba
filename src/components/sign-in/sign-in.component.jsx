import { handleSignIn } from "libraries/firebase/firebase.utils";
import Button from "components/button/button.component";
import Input from "components/input/input.component";
import PasswordInput from "components/inputs/password-field.component";
import CheckBox from "components/inputs/check-box.component";
import useStore from "libraries/zustand/store";
import { t } from "i18next";

export default function SignIn() {
	const setErrorMessage = useStore(state => state.setErrorMessage);
	const setStatusMessage = useStore(state => state.setStatusMessage);
	const setStatus = useStore(state => state.setStatus);

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={e => handleSignIn(e, setStatus, setStatusMessage, setErrorMessage)}>
			<Input id="sign-in-email" type="email" label={t("email")} />
			<PasswordInput id="sign-in-password" label={t("password")} />
			<CheckBox id="sign-in-remember-me" label={t("remember me")} />
			<Button>{t("sign in")}</Button>
		</form>
	);
}
