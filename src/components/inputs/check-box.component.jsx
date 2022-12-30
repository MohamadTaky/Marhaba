import React from "react";

export default function CheckBox({ label, id }) {
	return (
		<div className="flex items-center gap-2">
			<label className="cursor-pointer" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				type="checkbox"
				className="relative appearance-none w-5 h-5 mt-1 bg-skin-element checked:bg-skin-interactable-active rounded cursor-pointer
					transition-colors after:absolute after:left-1 checked:after:content-['\2714'] after:text-sm focus:outline-none"
			/>
		</div>
	);
}
