import { FormLabel } from "../FormLabel";

export function FormDate({
	label,
	name,
	defaultValue,
	placeholder,
	required,
}: {
	label?: string;
	name: string;
	defaultValue?: string;
	placeholder?: string;
	required?: boolean;
}) {
	return (
		<div className="form-item">
			{label && <FormLabel>{label}</FormLabel>}
			<input
				type="date"
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className="input input-bordered w-full"
				required={required}
			/>
		</div>
	);
}
