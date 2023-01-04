import NavMenu from "components/nav-menu/nav-menu.component";
import CurrentChat from "components/current-chat/current-chat.component";
import Navbar from "components/nav-bar/nav-bar.component";
import MyProfile from "components/my-profile/my-profile.component";
import useStore from "libraries/zustand/store";
import { useEffect } from "react";
import Sidebar from "components/sidebar/sidebar.component";
import Suspenser from "components/suspenser/suspenser.component";

export default function AppPage() {
	const setErrorMessage = useStore(state => state.setErrorMessage);
	const setStatusMessage = useStore(state => state.setStatusMessage);
	const setStatus = useStore(state => state.setStatus);
	const leftBarActive = useStore(state => state.leftBarActive);
	const rightBarActive = useStore(state => state.rightBarActive);

	useEffect(() => {
		setStatus("");
		setErrorMessage("");
		setStatusMessage("");
	}, []);

	return (
		<div className="flex h-screen">
			<div
				className={`fixed md:static md:w-8/12 top-0 left-0 z-50 duration-300 transition-transform flex w-full ${
					!leftBarActive && "ltr:-translate-x-full rtl:translate-x-full"
				}`}>
				<Navbar />
				<Sidebar>
					<Suspenser>
						<NavMenu />
					</Suspenser>
				</Sidebar>
			</div>
			<CurrentChat />
			<Sidebar
				styles={`fixed md:static top-0 left w-full md:w-4/12 gap-4 p-4 duration-300 items-center ${
					!rightBarActive && "ltr:translate-x-full rtl:-translate-x-full"
				}`}>
				<Suspenser>
					<MyProfile />
				</Suspenser>
			</Sidebar>
		</div>
	);
}
