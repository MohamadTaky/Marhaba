import { sendFriendRequest } from "libraries/firebase/firebase.utils";
import UserCard from "components/user-card/user-card.component";
import useStore from "libraries/zustand/store";
import Button from "components/button/button.component";
import { useFirestore } from "reactfire";
import useUserDoc from "libraries/reactfire/custom-hooks/useUserDoc";
import { t } from "i18next";

export default function FriendItem({ id, data }) {
	const setCurrentChat = useStore(state => state.setCurrentChat);
	const firestore = useFirestore();

	const { userDoc } = useUserDoc();

	const isFriend = userDoc.data().friends.includes(id);
	const isFriendRequestSent = userDoc.data().sentFriendRequests.includes(id);

	return (
		<UserCard {...data}>
			<Button disabled={isFriend || isFriendRequestSent} onClick={() => sendFriendRequest(id, firestore)}>
				{t(isFriend ? "friend" : isFriendRequestSent ? "sent" : "add")}
			</Button>
			<Button onClick={() => setCurrentChat({ otherUserId: id })}>{t("chat")}</Button>
		</UserCard>
	);
}
