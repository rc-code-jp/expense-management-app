"use client";

import type { expenseCategories, expenses } from "@/database/schema";
import { formActionState } from "@/features/expenses/actionState/formActionState";
import { deleteExpense } from "@/features/expenses/actions/deleteExpense";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import getExpenseList from "../../actions/getExpenseList";
import { EXPENSE_LIST_LIMIT } from "../../utils/expenseList";

type Item = {
	expenses: typeof expenses.$inferSelect;
	expenseCategories: typeof expenseCategories.$inferSelect;
};

export function ExpenseList({
	items,
}: {
	items: Item[];
}) {
	const [displayItems, setDisplayItems] = useState<Item[]>(items);
	const [noMore, setNoMore] = useState(items.length < EXPENSE_LIST_LIMIT);
	const [busy, setBusy] = useState(false);

	const [, formDispatch] = useFormState(deleteExpense, formActionState);

	const deleteAction = (formData: FormData) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;
		formDispatch(formData);
	};

	const getMoreItems = async () => {
		if (noMore) return;
		if (busy) return;
		const offset = displayItems.length;
		const res = await getExpenseList({ offset, limit: EXPENSE_LIST_LIMIT });
		setDisplayItems([...displayItems, ...res.items]);
		setNoMore(res.items.length < EXPENSE_LIST_LIMIT);
		setBusy(false);
	};

	return (
		<ul>
			{displayItems.map((item) => (
				<li key={item.expenses.id} style={{ marginTop: 10 }}>
					<div className="relative size-full rounded-md border border-primary/5 p-4 shadow-md hover:opacity-50">
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
			<li className="mt-4">
				<button
					type="button"
					className="btn btn-ghost btn-block"
					onClick={getMoreItems}
					disabled={noMore || busy}
				>
					{noMore ? "No more" : busy ? "Loading..." : "More"}
				</button>
			</li>
		</ul>
	);
}
