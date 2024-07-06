import { FormLabel } from "../FormLabel";

export function FormTime({
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
				type="time"
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className="input input-bordered w-full"
				required={required}
			/>
		</div>
	);
}
