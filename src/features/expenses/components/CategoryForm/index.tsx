"use client";

import { FormAlert } from "@/components/form/FormAlert";
import { FormButton } from "@/components/form/FormButton";
import { FormText } from "@/components/form/FormText";
import type { expenseCategories } from "@/database/schema";
import { formActionState } from "@/features/expenses/actionState/formActionState";
import { saveExpenseCategory } from "@/features/expenses/actions/saveExpenseCategory";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { deleteExpenseCategory } from "../../actions/deleteExpenseCategory";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryForm({
	item,
}: {
	item?: Item;
}) {
	const router = useRouter();

	const [formState, formDispatch] = useFormState(
		saveExpenseCategory,
		formActionState,
	);

	const [, deleteDispatch] = useFormState(
		deleteExpenseCategory,
		formActionState,
	);

	const deleteAction = (formData: FormData) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;
		deleteDispatch(formData);
		router.push("/items");
	};

	return (
		<div>
			<FormAlert message={formState.message} />
			<form action={formDispatch}>
				<div>
					<input type="hidden" name="id" defaultValue={item?.id} />
					<div>
						<FormText
							name="name"
							label="Name"
							defaultValue={item?.name || ""}
							required
						/>
					</div>
					<div>
						<FormText
							name="color"
							type="color"
							label="Color"
							defaultValue={item?.color || ""}
							required
						/>
					</div>
					<div className="mt-6">
						<FormButton>{item?.id ? "Update" : "Save"}</FormButton>
					</div>
				</div>
			</form>
			{item?.id && (
				<form action={deleteAction} className="mt-8 block">
					<FormButton type="submit" buttonClassName="text-error btn-ghost">
						Delete Item
					</FormButton>
				</form>
			)}
		</div>
	);
}
