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
		<div className="mb-2">
			<label className="flex flex-col">
				{label && <span className="">{label}</span>}
				<input
					type={type}
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
