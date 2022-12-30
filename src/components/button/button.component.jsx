export default function Button({ children, rounded, ...restProps }) {
	return (
		<button
			className="px-2 py-1 rounded-md w-fit
			bg-skin-interactable hover:bg-skin-interactable-hover
			disabled:hover:bg-skin-interactable disabled:opacity-75 disabled:cursor-not-allowed
			transition-colors"
			{...restProps}>
			{children}
		</button>
	);
}
