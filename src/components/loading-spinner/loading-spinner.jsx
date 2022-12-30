import { CircleNotch } from "phosphor-react";

export default function LoadingSpinner({ loadingMessage = "loading" }) {
	return (
		<p className="text-xl my-auto text-center p-2">
			{loadingMessage}
			<CircleNotch className={`inline ml-2 animate-spin-fast`} size={35} />
		</p>
	);
}
