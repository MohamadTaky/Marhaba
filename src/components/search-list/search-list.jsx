import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { query, collection, where, orderBy, startAt, endAt } from "firebase/firestore";
import FriendItem from "components/friend-item/friend-item.compoent";
import { useDeferredValue } from "react";

export default function SearchList({ searchKeyword }) {
	const firestore = useFirestore();
	const { data: user } = useUser();
	const defferedKeyword = useDeferredValue(searchKeyword);
	const isStale = defferedKeyword !== searchKeyword;
	const searchQuery = query(
		collection(firestore, "users"),
		where("name", "!=", user.displayName),
		orderBy("name"),
		startAt(defferedKeyword || " "),
		endAt((defferedKeyword && `${defferedKeyword}\uf8ff`) || " ")
	);
	const { data: searchResults } = useFirestoreCollectionData(searchQuery, { idField: "id" });

	return (
		<div className={`transition-opacity opacity-100 ${isStale && "opacity-50"}`}>
			<p className="m-2 font-semibold">{searchResults.length ? "Results:" : "No results found"}</p>
			{searchResults.map(doc => (
				<FriendItem
					key={doc.id}
					id={doc.id}
					data={{ name: doc.name, status: doc.status, avatarUrl: doc.avatarUrl }}
				/>
			))}
		</div>
	);
}
