import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { PencilLine, CheckCircle } from "phosphor-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Avatar from "components/avatar/avatar.component";
import TextArea from "components/inputs/text-area.component";
import { useFirestore, useAuth, useStorage } from "reactfire";
import useUserDoc from "libraries/reactfire/custom-hooks/useUserDoc";

export default function MyProfile() {
	const firestore = useFirestore();
	const storage = useStorage();
	const auth = useAuth();
	const [editing, setIsEditing] = useState(false);
	const [inputStatus, setInputStatus] = useState("");

	const { userDoc, status } = useUserDoc();

	const handleEditToggle = async () => {
		const userRef = doc(firestore, `users/${userDoc.id}`);
		const trimmedStatus = inputStatus.trim();
		if (editing && trimmedStatus && trimmedStatus != userDoc.data().status)
			await updateDoc(userRef, { status: trimmedStatus });
		else setInputStatus(userDoc.data().status);
		setIsEditing(prev => !prev);
	};

	const handleProfileImageChange = async e => {
		const imageFile = e.target.files[0];
		const imageRef = ref(storage, `images/${userDoc.id}`);
		const uploadResault = await uploadBytes(imageRef, imageFile);
		const downloadUrl = await getDownloadURL(uploadResault.ref);
		await updateProfile(auth.currentUser, { photoURL: downloadUrl });
		await updateDoc(doc(firestore, `users/${userDoc.id}`), { avatarUrl: downloadUrl });
	};

	if (status === "loading") return "Loading";

	return (
		<div className="flex flex-col gap-4 p-4 items-center bg-skin-window w-3/12 relative shadow-lg">
			<Avatar
				imageUrl={userDoc.data().avatarUrl}
				handleChange={handleProfileImageChange}
				iconSize="50"
				size="7rem"
			/>
			<p className="text-center text-lg font-bold">{userDoc.data().name}</p>
			<div className="w-full text-center text-skin-secondary relative">
				{editing ? (
					<>
						<TextArea value={inputStatus} onChange={e => setInputStatus(e.target.value)} />
						<button className="absolute -top-4 right-0 text-skin-primary">
							<CheckCircle className="text-skin-active" onClick={handleEditToggle} size="18" weight="fill" />
						</button>
					</>
				) : (
					<>
						<p className="p-1">{userDoc.data().status}</p>
						<button className="absolute -top-4 right-0 text-skin-primary">
							<PencilLine className="text-skin-active" onClick={handleEditToggle} weight="fill" size="18" />
						</button>
					</>
				)}
			</div>
			<p className="self-start bg-skin-element w-full p-1 rounded-md">
				Friends: {userDoc.data().friends.length}
			</p>
		</div>
	);
}
