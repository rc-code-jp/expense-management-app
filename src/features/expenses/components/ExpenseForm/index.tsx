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
import { swal } from "@/lib/sweetalert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { deleteExpense } from "../../actions/deleteExpense";

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

	const [deleteBusy, setDeleteBusy] = useState(false);

	const deleteAction = async (event: React.FormEvent) => {
		if (deleteBusy) return;
		try {
			event.preventDefault();
			const { isConfirmed } = await swal.confirm({
				text: "Are you sure?",
			});
			if (!isConfirmed) return;
			setDeleteBusy(true);
			await deleteExpense(item.id);
			router.push("/items");
		} catch (_) {
			swal.alert({ text: "Failed to delete item" });
		} finally {
			setDeleteBusy(false);
		}
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
					<FormButton disabled={deleteBusy}>
						{item.id ? "Update" : "Save"}
					</FormButton>
				</div>
			</form>
			{item.id && (
				<form onSubmit={deleteAction} className="mt-8 block">
					<input type="hidden" name="id" defaultValue={item.id ?? ""} />
					<FormButton
						type="submit"
						buttonClassName="text-error btn-ghost"
						disabled={deleteBusy}
					>
						{deleteBusy ? "Deleting..." : "Delete Item"}
					</FormButton>
				</form>
			)}
		</div>
	);
}
