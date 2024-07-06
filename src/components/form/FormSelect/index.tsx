import { FormLabel } from "../FormLabel";

export function FormSelect({
	label,
	name,
	options,
	defaultValue,
	required,
}: {
	label?: string;
	name: string;
	options: { value: string; text: string }[];
	defaultValue?: string;
	required?: boolean;
}) {
	return (
		<div className="form-item">
			{label && <FormLabel>{label}</FormLabel>}
			<select
				name={name}
				defaultValue={defaultValue}
				className="select select-bordered w-full"
				required={required}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
