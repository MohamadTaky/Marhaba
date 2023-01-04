import Avatar from "components/avatar/avatar.component";
import classNames from "classnames";

export default function ChatItem({ active, name, lastMessage }) {
	const activeStyle = classNames({ "bg-skin-active": active, "hover:bg-skin-hover": !active });
	return (
		<div className={`cursor-pointer flex items-center gap-4 p-4 transition-colors ${activeStyle} `}>
			<Avatar />
			<div>
				<p>{name}</p>
				<p>{lastMessage}</p>
			</div>
		</div>
	);
}
