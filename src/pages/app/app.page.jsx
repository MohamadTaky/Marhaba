import NavMenu from "components/nav-menu/nav-menu.component";
import CurrentChat from "components/current-chat/current-chat.component";
import Navbar from "components/nav-bar/nav-bar.component";
import MyProfile from "components/my-profile/my-profile.component";
import useStore from "libraries/zustand/store";
import { useEffect } from "react";
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
				className={`fixed top-0 ltr:left-0 rtl:right-0 w-full h-screen md:static md:w-8/12 z-40
				flex
				bg-skin-window
				md:ltr:translate-x-0 md:rtl:translate-x-0 duration-300 transition-transform
				${!leftBarActive && "ltr:-translate-x-full rtl:translate-x-full"}`}>
				<Navbar />
				<Suspenser>
					<div className="flex flex-col grow border-x-2 border-skin">
						<NavMenu />
					</div>
				</Suspenser>
			</div>
			<CurrentChat />
			<div
				className={`fixed top-0 w-full h-screen md:w-4/12 md:static z-50
				flex flex-col gap-4 p-4 items-center
				bg-skin-window border-x-skin border-x-2
				transition-transform md:ltr:translate-x-0 md:rtl:translate-x-0 duration-300
				${!rightBarActive && "ltr:translate-x-full rtl:-translate-x-full"}
				`}>
				<Suspenser>
					<MyProfile />
				</Suspenser>
			</div>
		</div>
	);
}
