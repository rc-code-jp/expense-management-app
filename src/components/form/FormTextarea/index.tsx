import { FormLabel } from "../FormLabel";

export function FormTextarea({
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
			<textarea
				className="textarea textarea-bordered"
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
}
