"use client";

import type { expenseCategories, expenses } from "@/database/schema";
import { formActionState } from "@/features/expenses/actionState/formActionState";
import { deleteExpense } from "@/features/expenses/actions/deleteExpense";
import Link from "next/link";
import { useFormState } from "react-dom";

type Item = {
	expenses: typeof expenses.$inferSelect;
	expenseCategories: typeof expenseCategories.$inferSelect;
};

export function ExpenseList({
	items,
}: {
	items: Item[];
}) {
	const [_formState, formDispatch] = useFormState(
		deleteExpense,
		formActionState,
	);

	const deleteAction = (formData: FormData) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;
		formDispatch(formData);
	};

	return (
		<ul>
			{items.map((item) => (
				<li key={item.expenses.id} style={{ marginTop: 10 }}>
					<div className="relative size-full rounded-md border border-primary/5 p-4 shadow-md">
						<Link
							prefetch={false}
							href={`/items/${item.expenses.id}`}
							className="block size-full"
						>
							<div className="font-bold text-xs">{item.expenses.date}</div>
							<div className="mt-1 font-bold text-md">
								{item.expenses.amount.toLocaleString()}
							</div>
							<p
								className="mt-1 text-xs"
								style={{
									color: item.expenseCategories.color ?? undefined,
								}}
							>
								{item.expenseCategories.name}
							</p>
						</Link>
						<form
							action={deleteAction}
							className="-translate-y-1/2 absolute top-1/2 right-2"
						>
							<input type="hidden" name="id" defaultValue={item.expenses.id} />
							<button
								type="submit"
								className="btn btn-error btn-outline btn-xs"
							>
								Delete
							</button>
						</form>
					</div>
				</li>
			))}
		</ul>
	);
}
