import classNames from "classnames";
import useStore, { usePersistedStore } from "libraries/zustand/store";
import { Sun, Moon } from "phosphor-react";

export default function NavItem({ Icon, tab, tooltip, bottom, handleClick }) {
	const currentTab = useStore(state => state.currentTab);
	const darkMode = usePersistedStore(state => state.darkMode);
	const activeClass = classNames({
		"bg-skin-sec text-skin-active": currentTab === tooltip,
		"hover:bg-skin-element text-skin-secondary": currentTab !== tooltip,
	});

	const setSidebarActive = useStore(state => state.setSidebarActive);
	const sidebarActive = useStore(state => state.sidebarActive);

	const handleSidebarToggle = () => {
		if (tooltip === "dark mode" || tooltip === "sign out") return;
		tooltip === currentTab ? setSidebarActive(!sidebarActive) : setSidebarActive(true);
	};

	return (
		<button
			onClick={() => {
				handleClick();
				handleSidebarToggle();
			}}
			className={`relative group ${bottom ? "mt-auto" : ""}`}>
			{tooltip === "dark mode" ? (
				<div className="relative">
					<Sun
						className={`p-2 box-content transition-opacity text-orange-600 ${darkMode && "opacity-0"}`}
						size={32}
						weight="fill"
					/>
					<Moon
						className={`absolute left-0 top-0 p-2 box-content transition-opacity text-blue-600 ${
							!darkMode && "opacity-0"
						}`}
						size={32}
						weight="fill"
					/>
				</div>
			) : (
				<Icon className={`p-2 box-content transition-colors ${activeClass}`} size={32} weight="fill" />
			)}
			<span className="z-10 absolute left-full top-0 mt-1 rounded-r-lg scale-x-0 group-hover:scale-x-100 whitespace-nowrap px-4 py-2 bg-skin-sec transition-transform origin-left">
				{tooltip}
			</span>
		</button>
	);
}
