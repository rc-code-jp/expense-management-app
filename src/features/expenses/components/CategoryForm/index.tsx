"use client";

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
		<form action={formDispatch}>
			<div>{JSON.stringify(formState)}</div>
			<div>
				<input type="hidden" name="id" defaultValue={item?.id} />
				<div>
					<label>
						<span>カテゴリー名</span>
						<input type="text" name="name" defaultValue={item?.name} />
					</label>
				</div>
				<div>
					<label>
						<span>カラー</span>
						<input type="color" name="color" defaultValue={item?.color ?? ""} />
					</label>
				</div>
				<div>
					<button type="submit">登録</button>
				</div>
			</div>
		</form>
	);
}
