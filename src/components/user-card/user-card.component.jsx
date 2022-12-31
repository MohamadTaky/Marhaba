import Avatar from "components/avatar/avatar.component";

export default function UserCard({ name, status, avatarUrl, children }) {
	return (
		<div className="p-3 hover:bg-skin-hover">
			<div className="flex items-center gap-2">
				<Avatar imageUrl={avatarUrl} />
				<div className="grow">
					<p className="font-bold">{name}</p>
					<p className="text-sm text-skin-secondary">{status}</p>
				</div>
			</div>
			<div className="flex justify-evenly my-2 text-sm">{children}</div>
		</div>
	);
}
