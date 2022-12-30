import React from "react";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
	AuthProvider,
	FirestoreProvider,
	StorageProvider,
	useFirebaseApp,
	useInitFirestore,
} from "reactfire";

export default function FirebaseComponents({ children }) {
	const app = useFirebaseApp();
	const auth = getAuth(app);
	const storage = getStorage(app);

	const { status, data: firestore } = useInitFirestore(
		async firebaseApp => {
			const db = initializeFirestore(firebaseApp, {});
			await enableIndexedDbPersistence(db);
			return db;
		},
		{ suspense: false }
	);

	if (status === "loading") return;

	return (
		<AuthProvider sdk={auth}>
			<FirestoreProvider sdk={firestore}>
				<StorageProvider sdk={storage}>{children}</StorageProvider>
			</FirestoreProvider>
		</AuthProvider>
	);
}
