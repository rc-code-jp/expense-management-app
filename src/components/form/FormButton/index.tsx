import { useFormStatus } from "react-dom";

export function FormButton({
	type = "submit",
	children,
}: {
	type?: "submit" | "button";
	children: React.ReactNode;
}) {
	const { pending } = useFormStatus();

	return (
		<div className="mb-2 flex justify-center">
			<button type={type} className="btn btn-wide shadow-md" disabled={pending}>
				{pending ? <span className="loading loading-spinner" /> : children}
			</button>
		</div>
	);
}
