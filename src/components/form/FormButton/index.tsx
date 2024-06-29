"use client";

import { type ClassValue, clsx } from "clsx";
import { useFormStatus } from "react-dom";

export function FormButton({
	type = "submit",
	children,
	buttonClassName = "primary",
}: {
	type?: "submit" | "button";
	children: React.ReactNode;
	buttonClassName?: ClassValue;
}) {
	const { pending } = useFormStatus();

	return (
		<div className="mb-2 flex justify-center">
			<button
				type={type}
				className={clsx("btn btn-wide shadow-md", buttonClassName)}
				disabled={pending}
			>
				{pending ? <span className="loading loading-spinner" /> : children}
			</button>
		</div>
	);
}
