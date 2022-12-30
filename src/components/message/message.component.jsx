import classNames from "classnames";
import { doc } from "firebase/firestore";
import { useFirestore, useUser, useFirestoreDocDataOnce } from "reactfire";

export default function Message({ content, sentAt, sentBy }) {
	const firestore = useFirestore();
	const { data: user } = useUser();
	const { data: senderData } = useFirestoreDocDataOnce(doc(firestore, `users/${sentBy}`));

	const date = sentAt && sentAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	const containerStyles = classNames(
		user.uid === sentBy ? "self-start rounded-r-xl" : "self-end rounded-l-xl"
	);

	return (
		<div className={`${containerStyles} min-w-[25ch] p-2 bg-skin-element`}>
			<span className="text-emerald-500 font-bold">{senderData.name}</span>
			<p className="my-1">{content}</p>
			<p className="w-fit ml-auto text-xs text-skin-secondary">{date}</p>
		</div>
	);
}
