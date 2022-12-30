// function withOpacity(color) {
// 	return ({opacity}) => `rgba(var(${color}),)`
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			animation: {
				"spin-fast": "spin 0.8s linear infinite",
			},
			textColor: {
				skin: {
					primary: "var(--color-text-primary)",
					secondary: "var(--color-text-secondary)",
					active: "var(--color-interactable)",
				},
			},
			backgroundColor: {
				skin: {
					fill: "var(--color-fill)",
					window: "var(--color-window)",
					element: "var(--color-element)",
					sec: "var(--color-sec)",

					interactable: "var(--color-interactable)",
					"interactable-hover": "var(--color-interactable-hover)",
					"interactable-active": "var(--color-interactable-active)",
				},
			},
			borderColor: {
				skin: "var(--color-sec)",
			},
		},
	},
	plugins: [],
};
