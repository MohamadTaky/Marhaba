import Avatar from "components/avatar/avatar.component";
import { doc } from "firebase/firestore";
import useStore from "libraries/zustand/store";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { t } from "i18next";
import { List, CaretRight } from "phosphor-react";

export default function Header() {
	const firestore = useFirestore();
	const otherId = useStore(state => state.currentChat.otherUserId);
	const toggleLeftBar = useStore(state => state.toggleLeftBar);
	const toggleRightBar = useStore(state => state.toggleRightBar);
	const { data: headerData } = useFirestoreDocData(doc(firestore, `users/${otherId}`));

	const deltaMinutes = minutes(Date.now() - headerData.lastActive.toDate());
	const date = headerData.lastActive.toDate().toLocaleDateString().toString();
	const time = headerData.lastActive.toDate().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	const isOnline = deltaMinutes < 5;

	return (
		<div className="flex gap-3 p-3 bg-skin-window border-b-2 border-skin rounded-b-xl shadow-md dark:shadow-none">
			<button className="md:hidden" onClick={toggleLeftBar}>
				<CaretRight size={48} />
			</button>
			{headerData.name && (
				<>
					<Avatar imageUrl={headerData?.avatarUrl} />
					<div className="grow">
						<p className="font-bold text-lg text-skin-active">{headerData.name}</p>
						<p className={`font-semibold text-sm  ${isOnline ? "text-green-500" : "text-skin-secondary"} `}>
							{!isOnline ? (
								<>
									{t("last seen")} : {date} {t("at")} {time}
								</>
							) : (
								"Online"
							)}
						</p>
					</div>
				</>
			)}
			<button className="md:hidden" onClick={toggleRightBar}>
				<List size={48} />
			</button>
		</div>
	);
}

function minutes(millis) {
	return parseInt(millis / 1000 / 60);
}
