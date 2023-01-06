import "./App.css";
import LandingPage from "pages/landing/landing.page";
import AppPage from "pages/app/app.page";
import { useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { usePersistedStore } from "libraries/zustand/store";
import { useRef } from "react";
import { useSigninCheck, useFirestore, useUser } from "reactfire";
import Suspenser from "components/suspenser/suspenser.component";
import { useTranslation } from "react-i18next";

function App() {
	const darkMode = usePersistedStore(state => state.darkMode);
	const intervalRef = useRef();
	const { data: signInCheckResult } = useSigninCheck();
	const firestore = useFirestore();
	const { data: user } = useUser();
	const { i18n } = useTranslation();
	useEffect(() => {
		if (user) {
			const userDocRef = doc(firestore, `users/${user.uid}`);
			const updateLastActive = async () =>
				await setDoc(userDocRef, { lastActive: serverTimestamp() }, { merge: true });
			updateLastActive();
			intervalRef.current = setInterval(updateLastActive, 5 * 60 * 1000);
		}
		return () => clearInterval(intervalRef.current);
	}, [user, firestore]);

	return (
		<div
			dir={i18n.language === "ar" ? "rtl" : "ltr"}
			className={`text-skin-primary bg-skin-fill ${darkMode ? "dark" : ""}`}>
			<Suspenser>{signInCheckResult.signedIn ? <AppPage /> : <LandingPage />}</Suspenser>
		</div>
	);
}

export default App;
