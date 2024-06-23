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
		<div className="mb-2">
			<label className="flex flex-col">
				{label && <span className="">{label}</span>}
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
			</label>
		</div>
	);
}
