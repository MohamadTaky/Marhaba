import { Suspense } from "react";
import LoadingSpinner from "components/loading-spinner/loading-spinner";

export default function Suspenser({ loadingMessage, children }) {
	return <Suspense fallback={<LoadingSpinner loadingMessage={loadingMessage} />}>{children}</Suspense>;
}
