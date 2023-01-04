import { PencilLine, CheckCircle } from "phosphor-react";
import TextArea from "components/inputs/text-area.component";
import { useState } from "react";
import { useFirestore } from "reactfire";
import useUserDoc from "libraries/reactfire/custom-hooks/useUserDoc";
import useToggle from "hooks/useToggle";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfileStatus() {
	const { value: editing, toggle: toggleEditing } = useToggle(false);
	const [inputStatus, setInputStatus] = useState("");
	const firestore = useFirestore();
	const { userDoc } = useUserDoc();

	const handleEditToggle = async () => {
		const userRef = doc(firestore, `users/${userDoc.id}`);
		const trimmedStatus = inputStatus.trim();
		if (editing && trimmedStatus && trimmedStatus != userDoc.data().status)
			await updateDoc(userRef, { status: trimmedStatus });
		else setInputStatus(userDoc.data().status);
		toggleEditing();
	};

	return (
		<div className="text-center text-skin-secondary relative">
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
	);
}
