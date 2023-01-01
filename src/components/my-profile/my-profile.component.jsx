import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { PencilLine, CheckCircle, X } from "phosphor-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Avatar from "components/avatar/avatar.component";
import TextArea from "components/inputs/text-area.component";
import { useFirestore, useAuth, useStorage } from "reactfire";
import useUserDoc from "libraries/reactfire/custom-hooks/useUserDoc";
import { useTranslation } from "react-i18next";
import useToggle from "hooks/useToggle";
import useStore from "libraries/zustand/store";

export default function MyProfile() {
	const firestore = useFirestore();
	const storage = useStorage();
	const auth = useAuth();
	const { value: editing, toggle: toggleEditing } = useToggle(false);
	const [inputStatus, setInputStatus] = useState("");
	const { userDoc, status } = useUserDoc();
	const { t, i18n } = useTranslation();
	const toggleRightBar = useStore(state => state.toggleRightBar);

	const handleEditToggle = async () => {
		const userRef = doc(firestore, `users/${userDoc.id}`);
		const trimmedStatus = inputStatus.trim();
		if (editing && trimmedStatus && trimmedStatus != userDoc.data().status)
			await updateDoc(userRef, { status: trimmedStatus });
		else setInputStatus(userDoc.data().status);
		toggleEditing();
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
			<div className="w-full text-center text-skin-secondary relative">
				{editing ? (
					<>
						<TextArea value={inputStatus} onChange={e => setInputStatus(e.target.value)} />
						<button className="absolute -top-4 text-skin-primary ltr:right-0 rtl:left-0">
							<CheckCircle className="text-skin-active" onClick={handleEditToggle} size="18" weight="fill" />
						</button>
					</>
				) : (
					<>
						<p className="p-1">{userDoc.data().status}</p>
						<button className="absolute -top-4 text-skin-primary ltr:right-0 rtl:left-0">
							<PencilLine className="text-skin-active" onClick={handleEditToggle} weight="fill" size="18" />
						</button>
					</>
				)}
			</div>
			<p className="self-start bg-skin-element w-full px-2 py-1 rounded-md">
				{t("friends")}: {userDoc.data().friends.length}
			</p>
			<p className="mt-auto">{t("language")} :</p>
			<div className="bg-skin-element flex rounded-lg overflow-hidden">
				<button
					onClick={() => i18n.changeLanguage("ar")}
					className={`${i18n.language === "ar" && "bg-skin-interactable-active"} px-2 py-1`}>
					العربية
				</button>
				<button
					onClick={() => i18n.changeLanguage("en")}
					className={`${i18n.language === "en" && "bg-skin-interactable-active"} px-2 py-1`}>
					English
				</button>
			</div>
		</>
	);
}
