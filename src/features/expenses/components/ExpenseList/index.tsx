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

	return (
		<ul>
			{items.map((item) => (
				<li key={item.expenses.id} style={{ marginTop: 10 }}>
					<div className="relative size-full">
						<Link
							prefetch={false}
							href={`/expenses/${item.expenses.id}`}
							className="shadow-md"
						>
							<p>{item.expenses.date}</p>
							<p>{item.expenseCategories.name}</p>
							<p>{item.expenses.amount}</p>
						</Link>
						<form
							action={formDispatch}
							className="-translate-y-1/2 absolute top-1/2 right-2"
						>
							<input type="hidden" name="id" defaultValue={item.expenses.id} />
							<button type="submit" className="btn">
								削除
							</button>
						</form>
					</div>
				</li>
			))}
		</ul>
	);
}
