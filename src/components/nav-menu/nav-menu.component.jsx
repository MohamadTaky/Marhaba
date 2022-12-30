import ChatsTab from "components/chats-tab/chats-tab.component";
import FriendRequestsList from "components/friend-requests-list/friend-requests-list";
import useStore from "libraries/zustand/store";
import FriendsTab from "components/friends-tab/friends-tab.component";

export default function NavMenu() {
	const currentTab = useStore(state => state.currentTab);
	return (
		<div className="flex flex-col bg-skin-window w-3/12">
			{(() => {
				switch (currentTab) {
					case "chats":
						return <ChatsTab />;
					case "friends":
						return <FriendsTab />;
					case "friend requests":
						return <FriendRequestsList />;
					default:
						return <></>;
				}
			})()}
		</div>
	);
}
