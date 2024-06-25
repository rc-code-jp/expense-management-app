"use client";

import type { expenseCategories } from "@/database/schema";
import { formActionState } from "@/features/expenses/actionState/formActionState";
import { deleteExpenseCategory } from "@/features/expenses/actions/deleteExpenseCaterogy";
import Link from "next/link";
import { useFormState } from "react-dom";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryList({
	items,
}: {
	items: Item[];
}) {
	const [_formState, formDispatch] = useFormState(
		deleteExpenseCategory,
		formActionState,
	);

	return (
		<ul>
			{items.map((item) => (
				<li key={item.id} style={{ marginTop: 10 }}>
					<div className="relative size-full">
						<Link prefetch={false} href={`/categories/${item.id}`}>
							<p
								style={{
									color: item.color ?? "black",
								}}
							>
								{item.name}
							</p>
						</Link>
						<form
							action={formDispatch}
							className="-translate-y-1/2 absolute top-1/2 right-2"
						>
							<input type="hidden" name="id" defaultValue={item.id} />
							<button type="submit">削除</button>
						</form>
					</div>
				</li>
			))}
		</ul>
	);
}
