import { auth } from "./firebase.config";
import {
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	browserLocalPersistence,
} from "firebase/auth";
import { doc, setDoc, writeBatch, arrayUnion, arrayRemove } from "firebase/firestore";

const errorMessages = {
	"auth/weak-password": "password should be at least 6 characters",
	"auth/email-already-in-use": "email already in use",
	"auth/wrong-password": "wrong password",
};

export async function handleSignUp(e, setStatus, setStatusMessage, setErrorMessage, firestore) {
	try {
		e.preventDefault();
		const {
			username: { value: username },
			email: { value: email },
			password: { value: password },
			confirmPassword: { value: confirmPassword },
		} = e.target;
		if (!username) throw new Error("please enter your name");
		else if (!email) throw new Error("please enter your email");
		else if (!password) throw new Error("please enter your password");
		else if (password.length <= 5) throw new Error("password should be at least 6 characters");
		else if (!confirmPassword) throw new Error("please confirm your password");
		else if (confirmPassword !== password) throw new Error("passwords does not match");
		setStatus("loading");
		setStatusMessage("signing up");
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(user, { displayName: username });
		const userDoc = doc(firestore, `users/${user.uid}`);
		await setDoc(userDoc, {
			name: user.displayName,
			profilePic: user.photoURL,
			status: "Hello world !",
			friends: [],
			sentFriendRequests: [],
			recievedFriendRequests: [],
		});
		setErrorMessage("");
	} catch (error) {
		setErrorMessage(error.code ? errorMessages[error.code] : error.message);
		setStatus("");
		setStatusMessage("");
	}
}

export async function handleSignIn(e, setStatus, setStatusMessage, setErrorMessage) {
	try {
		e.preventDefault();
		const {
			email: { value: email },
			password: { value: password },
			rememberMe: { checked: rememberMe },
		} = e.target;

		if (!email) throw new Error("please enter your email");
		else if (!password) throw new Error("please enter your password");

		setStatus("loading");
		setStatusMessage("signing in");
		await auth.setPersistence(rememberMe ? browserLocalPersistence : browserSessionPersistence);
		await signInWithEmailAndPassword(auth, email, password);
		setErrorMessage("");
	} catch (error) {
		setErrorMessage(error.code ? errorMessages[error.code] : error.message);
		setStatus("");
		setStatusMessage("");
	}
}

export async function sendFriendRequest(id, firestore) {
	const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);
	const friendDocRef = doc(firestore, `users/${id}`);
	const batch = writeBatch(firestore);
	batch.update(userDocRef, { sentFriendRequests: arrayUnion(id) });
	batch.update(friendDocRef, { recievedFriendRequests: arrayUnion(auth.currentUser.uid) });
	await batch.commit();
}

export async function acceptFriendRequest(id, firestore) {
	const unsubscribe = auth.onAuthStateChanged(async ({ uid }) => {
		if (!uid) return;

		const userRef = doc(firestore, `users/${uid}`);
		const acceptedUserRef = doc(firestore, `users/${id}`);
		const batch = writeBatch(firestore);
		batch.update(userRef, { recievedFriendRequests: arrayRemove(id), friends: arrayUnion(id) });
		batch.update(acceptedUserRef, {
			sentFriendRequests: arrayRemove(uid),
			friends: arrayUnion(uid),
		});
		await batch.commit();
		unsubscribe();
	});
}

export async function rejectFriendRequest(id, firestore) {
	const userRef = doc(firestore, `users/${auth.currentUser.uid}`);
	const rejectedUserRef = doc(firestore, `users/${id}`);
	const batch = writeBatch(firestore);
	batch.update(userRef, { recievedFriendRequests: arrayRemove(id) });
	batch.update(rejectedUserRef, { sentFriendRequests: arrayRemove(auth.currentUser.uid) });
	await batch.commit();
}
