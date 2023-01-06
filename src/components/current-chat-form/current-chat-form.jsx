import { PaperPlane } from "phosphor-react";
import { useState } from "react";
import useStore from "libraries/zustand/store";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import { t } from "i18next";

export default function CurrentChatForm({ scrollToBottom }) {
	const [input, setInput] = useState("");
	const { data: user } = useUser();
	const otherId = useStore(state => state.currentChat.otherUserId);
	const firestore = useFirestore();

	const handleSubmit = async e => {
		e.preventDefault();
		if (!input) return;

		const chatsCollection = collection(firestore, "chats");
		const currentChatDocRef = doc(chatsCollection, [...user.uid, ...otherId].sort().join(""));
		const currentChatMessagesCollection = collection(currentChatDocRef, "messages");
		await addDoc(currentChatMessagesCollection, {
			sentBy: user.uid,
			content: input,
			sentAt: serverTimestamp(),
		});
		setInput("");
		scrollToBottom();
	};

	return (
		otherId && (
			<form onSubmit={handleSubmit} className="mt-auto flex bg-skin-window">
				<input
					className="px-2 dir-auto flex-1 bg-transparent outline-none border-none dark:caret-gray"
					type="text"
					placeholder={t("message")}
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<button className="p-2 transition-colors hover:bg-skin-sec" type="submit">
					<PaperPlane className="text-skin-active" weight="fill" size={32} />
				</button>
			</form>
		)
	);
}
