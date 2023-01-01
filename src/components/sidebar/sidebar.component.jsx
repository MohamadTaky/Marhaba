export default function Sidebar({ children, styles }) {
	return (
		<div
			className={`relative flex flex-col w-full h-screen bg-skin-window border-x-skin border-x-2 transition-transform ${styles}`}>
			{children}
		</div>
	);
}
