import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDoc, useUser } from "reactfire";

export default function useUserDoc() {
	const firestore = useFirestore();
	const { data: userAuth } = useUser();
	const {
		data: userDoc,
		status,
		error,
	} = useFirestoreDoc(doc(firestore, `users/${userAuth.uid}`), { idField: "id" });
	return { userDoc, status, error };
}
