import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, where, query } from "firebase/firestore";
import ChatItem from "components/chat-item/chat-item.component";
import { useUser } from "reactfire";

export default function ChatsTab() {
	const { data: user } = useUser();
	const firestore = useFirestore();
	const chatsQuery = query(collection(firestore, "chats"), where("userIDs", "array-contains", user.uid));
	const { data: chats, status } = useFirestoreCollectionData(chatsQuery, { idField: "id" });

	if (status === "loading") return "Loading";
	return (
		<>
			{chats.map(doc => (
				<ChatItem key={doc.id} />
			))}
		</>
	);
}
