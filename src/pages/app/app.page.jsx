import NavMenu from "components/nav-menu/nav-menu.component";
import CurrentChat from "components/current-chat/current-chat.component";
import Navbar from "components/nav-bar/nav-bar.component";
import MyProfile from "components/my-profile/my-profile.component";
import useStore from "libraries/zustand/store";
import { useEffect } from "react";

export default function AppPage() {
	const setErrorMessage = useStore(state => state.setErrorMessage);
	const setStatusMessage = useStore(state => state.setStatusMessage);
	const setStatus = useStore(state => state.setStatus);

	useEffect(() => {
		setStatus("");
		setErrorMessage("");
		setStatusMessage("");
	}, []);

	return (
		<>
			<Navbar />
			<NavMenu />
			<CurrentChat />
			<MyProfile />
		</>
	);
}
