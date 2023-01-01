import classNames from "classnames";
import useStore, { usePersistedStore } from "libraries/zustand/store";
import { Sun, Moon } from "phosphor-react";
import { t } from "i18next";

export default function NavItem({ Icon, style, tooltip, bottom, handleClick }) {
	const currentTab = useStore(state => state.currentTab);
	const darkMode = usePersistedStore(state => state.darkMode);
	const activeClass = classNames({
		"bg-skin-sec text-skin-active": currentTab === tooltip,
		"hover:bg-skin-element text-skin-secondary": currentTab !== tooltip,
	});

	return (
		<button onClick={handleClick} className={`relative group ${bottom ? "mt-auto" : ""} ${style}`}>
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
			{tooltip && (
				<span
					className="z-10 absolute top-0 mt-1 whitespace-nowrap px-4 py-2 bg-skin-sec transition-transform scale-x-0 group-hover:scale-x-100
				ltr:origin-left ltr:left-full ltr:rounded-r-lg
				rtl:origin-right rtl:right-full rtl:rounded-l-lg">
					{t(tooltip)}
				</span>
			)}
		</button>
	);
}
