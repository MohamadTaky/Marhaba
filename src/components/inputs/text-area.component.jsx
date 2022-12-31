import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function TextArea({ ...rest }) {
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.style.height = "auto";
		inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
	});
	return (
		<textarea
			ref={inputRef}
			autoFocus
			className="outline-none w-full dir-auto bg-skin-element p-1 transition-all overflow-hidden rounded-md resize-none"
			{...rest}
		/>
	);
}
