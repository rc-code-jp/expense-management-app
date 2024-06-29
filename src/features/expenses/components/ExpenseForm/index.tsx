"use client";

import { FormAlert } from "@/components/form/FormAlert";
import { FormButton } from "@/components/form/FormButton";
import { FormDate } from "@/components/form/FormDate";
import { FormSelect } from "@/components/form/FormSelect";
import { FormText } from "@/components/form/FormText";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormTime } from "@/components/form/FormTime";
import type { expenseCategories, expenses } from "@/database/schema";
import { formActionState } from "@/features/expenses/actionState/formActionState";
import { saveExpense } from "@/features/expenses/actions/saveExpense";
import { useFormState, useFormStatus } from "react-dom";
import { deleteExpense } from "../../actions/deleteExpense";
import { useRouter } from "next/navigation";

type CategoryItem = typeof expenseCategories.$inferSelect;
type ExpenseItem = typeof expenses.$inferSelect;

export function ExpenseForm({
	categoryList,
	item,
}: {
	categoryList: CategoryItem[];
	item: ExpenseItem;
}) {
	const router = useRouter();

	const [formState, formDispatch] = useFormState(saveExpense, formActionState);

	const [, deleteDispatch] = useFormState(deleteExpense, formActionState);

	const deleteAction = (formData: FormData) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;
		deleteDispatch(formData);
		router.push("/history");
	};

	return (
		<div>
			<FormAlert message={formState.message} />
			<form action={formDispatch}>
				<input type="hidden" name="id" defaultValue={item.id ?? ""} />
				<div>
					<FormText
						type="tel"
						name="amount"
						label="Amount"
						defaultValue={item.amount || ""}
						required
					/>
				</div>
				<div>
					<FormSelect
						label="Category"
						name="categoryId"
						required
						defaultValue={item.categoryId ?? ""}
						options={categoryList.map((category) => ({
							value: category.id,
							text: category.name,
						}))}
					/>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<FormDate
						name="date"
						label="Date"
						defaultValue={item.date ?? ""}
						required
					/>
					<FormTime name="time" label="Time" defaultValue={item.time ?? ""} />
				</div>
				<div>
					<FormTextarea
						name="note"
						label="Note"
						defaultValue={item.note ?? ""}
					/>
				</div>
				<div className="mt-6">
					<FormButton>{item.id ? "Update" : "Save"}</FormButton>
				</div>
			</form>
			{item.id && (
				<form action={deleteAction} className="mt-8 block">
					<FormButton type="submit" buttonClassName="text-error btn-ghost">
						Delete Item
					</FormButton>
				</form>
			)}
		</div>
	);
}
