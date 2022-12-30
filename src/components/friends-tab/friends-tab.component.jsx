import { useState } from "react";
import SearchField from "components/inputs/searchField.component";
import FriendsList from "components/friends-list/friends-list.component";
import SearchList from "components/search-list/search-list";
import Suspenser from "components/suspenser/suspenser.component";

export default function FriendsTab() {
	const [searchInput, setSearchInput] = useState("");
	return (
		<>
			<SearchField
				background="bg-transparent"
				border="border-b-skin border-b-2"
				placeholder="search for a friend"
				value={searchInput}
				onChange={e => setSearchInput(e.target.value)}
				handleErase={() => setSearchInput("")}
			/>
			<Suspenser>{searchInput ? <SearchList searchKeyword={searchInput} /> : <FriendsList />}</Suspenser>
		</>
	);
}
