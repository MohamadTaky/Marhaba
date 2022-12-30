import React from "react";
import { collection, query, where } from "firebase/firestore";
import FriendRequestItem from "components/friend-request-item/friend-request-item";
import { useFirestore, useUser, useFirestoreCollectionData } from "reactfire";

export default function FriendRequestsList() {
	const { data: user } = useUser();
	const firestore = useFirestore();

	const friendRequestsRef = query(
		collection(firestore, "users"),
		where("sentFriendRequests", "array-contains", user.uid)
	);

	const { data: friendRequests, status } = useFirestoreCollectionData(friendRequestsRef, { idField: "id" });

	return (
		<>
			{status === "loading" ? (
				<p className="m-4">Loading</p>
			) : (
				friendRequests.map(doc => (
					<FriendRequestItem
						key={doc.id}
						id={doc.id}
						data={{ name: doc.name, status: doc.status, avatarUrl: doc.avatarUrl }}
					/>
				))
			)}
		</>
	);
}
