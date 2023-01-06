import Avatar from "components/avatar/avatar.component";
import { doc } from "firebase/firestore";
import useStore from "libraries/zustand/store";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { t } from "i18next";

export default function Header() {
	const firestore = useFirestore();
	const otherId = useStore(state => state.currentChat.otherUserId);
	const {
		data: { name, lastActive, avatarUrl },
	} = useFirestoreDocData(doc(firestore, `users/${otherId}`));
	const online = isOnline(lastActive);
	const lastSeen = getFormattedLastSeen(lastActive);

	return (
		name && (
			<>
				<Avatar imageUrl={avatarUrl} />
				<div className="grow">
					<p className="font-bold text-lg text-skin-active">{name}</p>
					<p className={`font-semibold text-sm  ${online ? "text-green-500" : "text-skin-secondary"} `}>
						{online ? "Online" : lastSeen}
					</p>
				</div>
			</>
		)
	);
}

function minutes(millis) {
	return parseInt(millis / 1000 / 60);
}

function isOnline(lastActive) {
	const deltaMinutes = minutes(Date.now() - lastActive.toDate());
	return deltaMinutes < 5;
}

function getFormattedLastSeen(lastActive) {
	const date = lastActive.toDate().toLocaleDateString().toString();
	const time = lastActive.toDate().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	return `${t("last seen")} : ${date} ${t("at")} ${time}`;
}
