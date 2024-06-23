export function FormText({
	label,
	name,
	defaultValue,
	placeholder,
	required,
}: {
	label?: string;
	name: string;
	defaultValue?: string | number;
	placeholder?: string;
	required?: boolean;
}) {
	return (
		<div className="mb-2">
			<label className="flex flex-col">
				{label && <span className="">{label}</span>}
				<input
					type="text"
					name={name}
					defaultValue={defaultValue}
					placeholder={placeholder}
					className="input input-bordered w-full"
					required={required}
				/>
			</label>
		</div>
	);
}
