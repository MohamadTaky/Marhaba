import { auth } from "./firebase.config";
import {
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	browserLocalPersistence,
} from "firebase/auth";
import {
	doc,
	setDoc,
	writeBatch,
	arrayUnion,
	arrayRemove,
	query,
	collection,
	where,
} from "firebase/firestore";

const errorMessages = {
	"auth/weak-password": "Password should be at least 6 characters",
	"auth/email-already-in-use": "Email already in use",
	"auth/wrong-password": "Wrong password",
};

export const handleSignUp = async (e, setStatus, setStatusMessage, setErrorMessage, firestore) => {
	e.preventDefault();
	const [{ value: username }, { value: email }, { value: password }, { value: confirmPassword }] =
		e.target.elements;
	try {
		if (!username) throw "Please enter your name";
		if (!email) throw "Please enter your email";
		if (!password) throw "Please enter your password";
		if (!confirmPassword) throw "Please confirm your password";
		if (confirmPassword !== password) throw "Passwords does not match";
		setStatus("loading");
		setStatusMessage("Signing up");
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
			chatIDs: [],
		});
		setErrorMessage("");
		setStatus("complete");
		setStatusMessage("Signed up succesfully, Welcome !");
	} catch (error) {
		setErrorMessage(error.code ? errorMessages[error.code] : error.message || error);
		setStatus("");
		setStatusMessage("");
	}
};

export const handleSignIn = async (e, setStatus, setStatusMessage, setErrorMessage) => {
	e.preventDefault();
	const [{ value: email }, { value: password }, { checked: rememberMe }] = e.target.elements;
	try {
		if (!email) throw "Please enter your email";
		if (!password) throw "Please enter your password";

		setStatus("loading");
		setStatusMessage("Signing in");
		await auth.setPersistence(rememberMe ? browserLocalPersistence : browserSessionPersistence);
		const userAuth = await signInWithEmailAndPassword(auth, email, password);
		setErrorMessage("");
		setStatus("complete");
		setStatusMessage(`Signed in successfully, Welcome back ${userAuth.user.displayName} !`);
	} catch (error) {
		setErrorMessage(error.code ? errorMessages[error.code] : error.message || error);
		setStatus("");
		setStatusMessage("");
	}
};

export const sendFriendRequest = async (id, firestore) => {
	const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);
	const friendDocRef = doc(firestore, `users/${id}`);
	const batch = writeBatch(firestore);
	batch.update(userDocRef, { sentFriendRequests: arrayUnion(id) });
	batch.update(friendDocRef, { recievedFriendRequests: arrayUnion(auth.currentUser.uid) });
	await batch.commit();
};

export const acceptFriendRequest = async (id, firestore) => {
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
};

export const rejectFriendRequest = async (id, firestore) => {
	const userRef = doc(firestore, `users/${auth.currentUser.uid}`);
	const rejectedUserRef = doc(firestore, `users/${id}`);
	const batch = writeBatch(firestore);
	batch.update(userRef, { recievedFriendRequests: arrayRemove(id) });
	batch.update(rejectedUserRef, { sentFriendRequests: arrayRemove(auth.currentUser.uid) });
	await batch.commit();
};
