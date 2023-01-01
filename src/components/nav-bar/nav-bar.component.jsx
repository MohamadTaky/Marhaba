import React from "react";
import { SignOut, ChatCircle, User, Users, UserGear, Sun, Moon, CaretLeft } from "phosphor-react";
import NavItem from "components/nav-item/nav-item.component";
import { usePersistedStore } from "libraries/zustand/store";
import { useAuth } from "reactfire";
import useStore from "libraries/zustand/store";

export default function Navbar() {
	const darkMode = usePersistedStore(state => state.darkMode);
	const toggleDarkMode = usePersistedStore(state => state.toggleDarkMode);
	const setCurrentTab = useStore(state => state.setCurrentTab);
	const toggleLeftBar = useStore(state => state.toggleLeftBar);
	const auth = useAuth();

	return (
		<nav className="flex flex-col h-screen bg-skin-window">
			<NavItem style="md:hidden" Icon={CaretLeft} handleClick={toggleLeftBar} />
			<NavItem Icon={ChatCircle} tooltip="chats" handleClick={() => setCurrentTab("chats")} />
			<NavItem Icon={Users} tooltip="groups" handleClick={() => setCurrentTab("groups")} />
			<NavItem Icon={User} tooltip="friends" handleClick={() => setCurrentTab("friends")} />
			<NavItem
				Icon={UserGear}
				tooltip="friend requests"
				handleClick={() => setCurrentTab("friend requests")}
			/>

			<NavItem Icon={darkMode ? Moon : Sun} tooltip="dark mode" handleClick={toggleDarkMode} />
			<NavItem Icon={SignOut} tooltip="sign out" bottom handleClick={() => auth.signOut()} />
		</nav>
	);
}
