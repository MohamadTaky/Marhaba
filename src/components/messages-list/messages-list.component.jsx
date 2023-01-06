import Message from "components/message/message.component";
import useStore from "libraries/zustand/store";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import { useFirestoreCollectionData } from "reactfire";
import { useEffect } from "react";

export default function MessagesList({ bottomRef }) {
	const firestore = useFirestore();
	const { data: user } = useUser();
	const currentChat = useStore(state => state.currentChat);

	useEffect(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), []);

	const messagesQuery = query(
		collection(firestore, `chats/${[...user.uid, ...currentChat.otherUserId].sort().join("")}/messages`),
		orderBy("sentAt", "asc")
	);
	const { data: messages } = useFirestoreCollectionData(messagesQuery, { idField: "id" });
	return (
		<>
			{messages.map(({ id, ...rest }) => (
				<Message key={id} {...rest} />
			))}
			<div ref={bottomRef} />
		</>
	);
}
