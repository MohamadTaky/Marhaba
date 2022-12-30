import Message from "components/message/message.component";
import useStore from "libraries/zustand/store";
import { usePersistedStore } from "libraries/zustand/store";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import classNames from "classnames";
import { useFirestoreCollectionData } from "reactfire";
import { useEffect } from "react";

export default function MessagesList({ bottomRef }) {
	const firestore = useFirestore();
	const { data: user } = useUser();
	const currentChat = useStore(state => state.currentChat);
	const darkMode = usePersistedStore(state => state.darkMode);

	useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), []);

	const messagesQuery = query(
		collection(firestore, `chats/${[...user.uid, ...currentChat.otherUserId].sort().join("")}/messages`),
		orderBy("sentAt", "asc")
	);
	const { data: messages, status } = useFirestoreCollectionData(messagesQuery, { idField: "id" });

	if (status === "loading") return "Loading";

	const styles = classNames("flex flex-col gap-4 p-2 overflow-auto", darkMode ? "dark-scroll" : "scroll");
	return (
		<div className={styles}>
			{messages.map(({ id, ...rest }) => (
				<Message key={id} {...rest} />
			))}
			<div ref={bottomRef}></div>
		</div>
	);
}
