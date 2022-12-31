import { ReactComponent as ReactLogo } from "assets/svgs/react-icon.svg";
import { ReactComponent as TailwindLogo } from "assets/svgs/tailwindcss-icon.svg";
import { ReactComponent as FirebaseLogo } from "assets/svgs/firebase-icon.svg";
import { PhosphorLogo } from "phosphor-react";
import { useTranslation } from "react-i18next";

export default function Intro() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center bg-skin-window text-skin-primary w-1/2 p-4 h-screen relative shadow-lg dark:shadow-none shadow-gray-500">
			<h1 className="mt-4 text-5xl font-bold text-skin">{t("app name")}</h1>
			<footer className="mt-auto">
				<p className="mb-4 text-center text-lg font-bold">{t("made with")}: </p>
				<ul className="flex gap-2">
					<li>
						<a target="_blank" href="https://reactjs.org">
							<ReactLogo className="w-10 h-10 fill-gray-500 transition-colors hover:fill-[#06bded]" />
						</a>
					</li>
					<li>
						<a target="_blank" href="https://tailwindcss.com">
							<TailwindLogo className="w-10 h-10 fill-gray-500 transition-colors  hover:fill-[#48aaae]" />
						</a>
					</li>
					<li>
						<a target="_blank" href="https://phosphoricons.com">
							<PhosphorLogo className="w-10 h-10 text-gray-500 transition-colors hover:text-[#ffd171]" />
						</a>
					</li>
					<li>
						<a target="_blank" href="https://firebase.google.com">
							<FirebaseLogo className="w-10 h-10 fill-gray-500 transition-colors hover:fill-[#f4a011]" />
						</a>
					</li>
				</ul>
			</footer>
		</div>
	);
}
