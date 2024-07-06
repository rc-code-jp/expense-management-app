import { FormLabel } from "../FormLabel";

export function FormText({
	label,
	name,
	defaultValue,
	type = "text",
	placeholder,
	required,
}: {
	label?: string;
	name: string;
	defaultValue?: string | number;
	type?: "text" | "color" | "email" | "number" | "password" | "tel" | "url";
	placeholder?: string;
	required?: boolean;
}) {
	return (
		<div className="form-item">
			{label && <FormLabel>{label}</FormLabel>}
			<input
				type={type}
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className="input input-bordered w-full"
				required={required}
			/>
		</div>
	);
}
