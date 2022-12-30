import { collection, query, where } from "firebase/firestore";
import FriendItem from "components/friend-item/friend-item.compoent";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export default function FriendsList() {
	const { data: user } = useUser();
	const firestore = useFirestore();
	const friendsQuery = query(collection(firestore, "users"), where("friends", "array-contains", user.uid));
	const { data: friends } = useFirestoreCollectionData(friendsQuery, { idField: "id" });

	return (
		<>
			<p className="m-2 font-semibold">{friends.length ? "Friends:" : "You don't have any friends"} </p>
			{friends.map(doc => (
				<FriendItem
					key={doc.id}
					id={doc.id}
					data={{ name: doc.name, status: doc.status, avatarUrl: doc.avatarUrl }}
				/>
			))}
		</>
	);
}
