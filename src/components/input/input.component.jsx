import classNames from "classnames";

export default function Input({ border, background, label, id, type, children, ...rest }) {
	const containerStyles = classNames(border || "border-2 border-skin", background || "bg-skin-element");
	return (
		<div>
			{label && (
				<label className="block mb-2" htmlFor={id}>
					{label}
				</label>
			)}
			<div dir="auto" className={`flex items-center px-2 py-1 rounded-md ${containerStyles}`}>
				<input
					className={`bg-transparent w-full border-none outline-none ${
						type === "password" && "tracking-widest"
					}`}
					type={type}
					id={id}
					{...rest}
				/>
				{children}
			</div>
		</div>
	);
}
