import Header from "components/header/header.component";
import CurrentChatForm from "components/current-chat-form/current-chat-form";
import useStore from "libraries/zustand/store";
import MessagesList from "components/messages-list/messages-list.component";
import { useRef } from "react";
import Suspenser from "components/suspenser/suspenser.component";
import { List, CaretRight } from "phosphor-react";

export default function CurrentChat() {
	const otherId = useStore(state => state.currentChat.otherUserId);
	const toggleLeftBar = useStore(state => state.toggleLeftBar);
	const toggleRightBar = useStore(state => state.toggleRightBar);
	const bottomRef = useRef();
	return (
		<div className="flex flex-col justify-center bg-skin-fill w-full">
			<Suspenser>
				<header className=" mb-auto p-3 gap-3 flex justify-between bg-skin-window border-b-2 border-skin rounded-b-xl shadow-md dark:shadow-none">
					<button className="md:hidden rtl:rotate-180" onClick={toggleLeftBar}>
						<CaretRight size={25} weight="bold" />
					</button>
					{otherId && <Header />}
					<button className="md:hidden" onClick={toggleRightBar}>
						<List size={25} weight="bold" />
					</button>
				</header>
				<div className={`flex flex-col gap-4 p-2 overflow-auto`}>
					{otherId && <MessagesList bottomRef={bottomRef} />}
				</div>
				<CurrentChatForm scrollToBottom={() => scrollToBottom(bottomRef.current)} />
			</Suspenser>
		</div>
	);
}

function scrollToBottom(ref) {
	ref.scrollIntoView({ behavior: "smooth" });
}
