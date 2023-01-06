import { User, UsersThree, Plus } from "phosphor-react";

export default function Avatar({ isGroup, imageUrl, size = "3.5rem", iconSize = "28", handleChange }) {
	return (
		<div
			style={{
				backgroundImage: `url('${imageUrl}')`,
				width: size,
			}}
			className={`aspect-square bg-cover bg-center self-center group flex justify-center items-center relative rounded-full overflow-hidden bg-skin-sec`}>
			{!imageUrl &&
				(isGroup ? (
					<UsersThree weight="fill" size={iconSize.toString()} />
				) : (
					<User weight="fill" size={iconSize.toString()} />
				))}
			{handleChange && (
				<>
					<label
						className="rounded-full w-full h-full absolute grid place-items-center bg-black opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
						htmlFor="profileImageUpload">
						<Plus className="text-gray-300" size={iconSize.toString()} />
					</label>
					<input
						className="w-0 h-0"
						id="profileImageUpload"
						type="file"
						accept=".png,.jpg"
						onChange={handleChange}
					/>
				</>
			)}
		</div>
	);
}
