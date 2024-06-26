"use client";

import { FormAlert } from "@/components/form/FormAlert";
import { FormButton } from "@/components/form/FormButton";
import { FormText } from "@/components/form/FormText";
import type { expenseCategories } from "@/database/schema";
import { formActionState } from "@/features/expenses/actionState/formActionState";
import { saveExpenseCategory } from "@/features/expenses/actions/saveExpenseCategory";
import { useFormState } from "react-dom";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryForm({
	item,
}: {
	item?: Item;
}) {
	const [formState, formDispatch] = useFormState(
		saveExpenseCategory,
		formActionState,
	);

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
		</div>
	);
}
