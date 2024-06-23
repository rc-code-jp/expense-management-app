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
		<div className="mb-2">
			<label className="flex flex-col">
				{label && <span className="">{label}</span>}
				<textarea
					className="textarea textarea-bordered"
					name={name}
					defaultValue={defaultValue}
					placeholder={placeholder}
					required={required}
				/>
			</label>
		</div>
	);
}
