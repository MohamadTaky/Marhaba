import classNames from "classnames";
import { User, UsersThree, Plus } from "phosphor-react";

export default function Avatar({ isGroup, imageUrl, size = "3.5rem", iconSize = "28", handleChange }) {
	const sizeStyle = { width: size };
	const iconStyle = classNames({ "transition-opacity  group-hover:opacity-0": handleChange });
	return (
		<div
			style={sizeStyle}
			className="aspect-square self-center group bg-cover flex justify-center items-center relative rounded-full overflow-hidden bg-skin-sec">
			{imageUrl ? (
				<img src={imageUrl} />
			) : isGroup ? (
				<UsersThree className={iconStyle} weight="fill" size={iconSize.toString()} />
			) : (
				<User weight="fill" size={iconSize.toString()} />
			)}
			{handleChange && (
				<>
					<label
						className="rounded-full w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black opacity-0 transition-opacity group-hover:opacity-80 cursor-pointer"
						htmlFor="profile-image-upload">
						<Plus className="text-gray-300" size={iconSize.toString()} weight="fill" />
					</label>
					<input
						className="opacity-0 absolute w-0 h-0"
						id="profile-image-upload"
						type="file"
						accept=".png,.jpg"
						onChange={handleChange}
					/>
				</>
			)}
		</div>
	);
}
