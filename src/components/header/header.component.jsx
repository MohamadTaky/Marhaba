import Avatar from "components/avatar/avatar.component";
import { doc } from "firebase/firestore";
import useStore from "libraries/zustand/store";
import { useFirestore, useFirestoreDocData } from "reactfire";

export default function Header() {
	const firestore = useFirestore();
	const otherId = useStore(state => state.currentChat.otherUserId);

	const { data: headerData } = useFirestoreDocData(doc(firestore, `users/${otherId}`));

	const deltaMinutes = minutes(Date.now() - headerData.lastActive.toDate());
	const date = headerData.lastActive.toDate();
	const isOnline = deltaMinutes < 5;

	return (
		<div className="flex gap-3 p-3 bg-skin-window border-b-2 border-skin rounded-b-xl shadow-md dark:shadow-none">
			{headerData.name && (
				<>
					<Avatar imageUrl={headerData.avatarUrl} />
					<div>
						<p className="font-bold text-lg text-skin-active">{headerData.name}</p>
						<p className={`font-semibold text-sm  ${isOnline ? "text-green-500" : "text-skin-secondary"} `}>
							{isOnline
								? "Online"
								: `Last seen: ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
								  })}`}
						</p>
					</div>
				</>
			)}
		</div>
	);
}

function minutes(millis) {
	return parseInt(millis / 1000 / 60);
}
