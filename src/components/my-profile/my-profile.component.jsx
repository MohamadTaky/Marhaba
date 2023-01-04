import { doc, updateDoc } from "firebase/firestore";
import { X } from "phosphor-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Avatar from "components/avatar/avatar.component";
import { useFirestore, useAuth, useStorage } from "reactfire";
import useUserDoc from "libraries/reactfire/custom-hooks/useUserDoc";
import useStore from "libraries/zustand/store";
import LanguageSelector from "components/language-selector/language-selector.component";
import ProfileStatus from "components/profile-status/profile-status.component";
import { t } from "i18next";

export default function MyProfile() {
	const firestore = useFirestore();
	const storage = useStorage();
	const auth = useAuth();

	const { userDoc, status } = useUserDoc();
	const toggleRightBar = useStore(state => state.toggleRightBar);

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
		<>
			<button className="md:hidden ltr:ml-auto rtl:ml-auto" onClick={toggleRightBar}>
				<X size="24" weight="bold" />
			</button>
			<Avatar
				imageUrl={userDoc.data().avatarUrl}
				handleChange={handleProfileImageChange}
				iconSize="50"
				size="7rem"
			/>
			<p className="text-center text-lg font-bold">{userDoc.data().name}</p>
			<ProfileStatus />
			<p className="self-start bg-skin-element w-full px-2 py-1 rounded-md">
				{t("friends")}: {userDoc.data().friends.length}
			</p>
			<LanguageSelector />
		</>
	);
}
