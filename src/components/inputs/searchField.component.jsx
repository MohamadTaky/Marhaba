import { X, MagnifyingGlass } from "phosphor-react";
import Input from "components/input/input.component";

export default function SearchField({ value, handleErase, ...rest }) {
	return (
		<Input value={value} {...rest}>
			<button tabIndex="-1" type="button" className="relative ml-2" onClick={handleErase}>
				<X
					className={`transition-opacity absolute opacity-0 ${value && "opacity-100"}`}
					size={24}
					weight="bold"
				/>
				<MagnifyingGlass
					className={`transition-opacity opacity-0 ${!value && "opacity-100"}`}
					size={24}
					weight="bold"
				/>
			</button>
		</Input>
	);
}
