import UserCard from "components/user-card/user-card.component";
import { acceptFriendRequest, rejectFriendRequest } from "libraries/firebase/firebase.utils";
import Button from "components/button/button.component";
import { useFirestore } from "reactfire";

export default function FriendRequestItem({ id, data }) {
	const firestore = useFirestore();
	return (
		<UserCard {...data}>
			<Button onClick={() => acceptFriendRequest(id, firestore)}>Accept</Button>
			<Button onClick={() => rejectFriendRequest(id, firestore)}>Reject</Button>
		</UserCard>
	);
}
