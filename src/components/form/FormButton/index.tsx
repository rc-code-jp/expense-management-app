export function FormButton({
	type = "submit",
	children,
}: {
	type?: "submit" | "button";
	children: React.ReactNode;
}) {
	return (
		<div className="mb-2 flex justify-center">
			<button type={type} className="btn btn-wide">
				{children}
			</button>
		</div>
	);
}
