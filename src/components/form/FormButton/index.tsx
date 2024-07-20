"use client";

import { type ClassValue, clsx } from "clsx";
import { useFormStatus } from "react-dom";

export function FormButton({
	type = "submit",
	children,
	buttonClassName = "primary",
	disabled,
}: {
	type?: "submit" | "button";
	children: React.ReactNode;
	buttonClassName?: ClassValue;
	disabled?: boolean;
}) {
	const { pending } = useFormStatus();

	return (
		<div className="form-item items-center">
			<button
				type={type}
				className={clsx("btn btn-wide shadow-md", buttonClassName)}
				disabled={disabled || pending}
			>
				{pending ? <span className="loading loading-spinner" /> : children}
			</button>
		</div>
	);
}
