import Header from "components/header/header.component";
import CurrentChatForm from "components/current-chat-form/current-chat-form";
import useStore from "libraries/zustand/store";
import MessagesList from "components/messages-list/messages-list.component";
import { useRef } from "react";
import Suspenser from "components/suspenser/suspenser.component";

const scrollToBottom = ref => ref?.scrollIntoView({ behavior: "smooth" });

export default function CurrentChat() {
	const otherId = useStore(state => state.currentChat.otherUserId);
	const bottomRef = useRef();

	return (
		<div className="flex flex-col justify-center w-3/6 bg-skin-fill">
			{otherId ? (
				<>
					<Suspenser>
						<Header />
						<MessagesList bottomRef={bottomRef} />
					</Suspenser>
					<CurrentChatForm scrollToBottom={() => scrollToBottom(bottomRef.current)} />
				</>
			) : (
				<p className="text-center">No Current Chat</p>
			)}
		</div>
	);
}
