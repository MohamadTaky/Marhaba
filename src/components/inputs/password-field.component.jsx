import { Eye, EyeSlash } from "phosphor-react";
import Input from "components/input/input.component";
import useToggle from "hooks/useToggle";

export default function PasswordInput({ ...rest }) {
	const { value: showPassword, toggle: toggleShowPassword } = useToggle(false);
	return (
		<Input type={showPassword ? "text" : "password"} {...rest}>
			<button onClick={toggleShowPassword} tabIndex="-1" type="button" className="relative ml-2">
				<Eye className={`opacity-0 transition-opacity ${!showPassword && "opacity-100"}`} size={24} />
				<EyeSlash
					className={`opacity-0 transition-opacity ${showPassword && "opacity-100"} absolute top-0`}
					size={24}
				/>
			</button>
		</Input>
	);
}
