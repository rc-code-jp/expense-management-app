import type { expenseCategories, expenses } from "@/database/schema";
import Link from "next/link";
import { deleteExpense } from "../../actions/deleteExpense";

type Item = {
	expenses: typeof expenses.$inferSelect;
	expenseCategories: typeof expenseCategories.$inferSelect;
};

export function ExpenseList({
	items,
}: {
	items: Item[];
}) {
	return (
		<ul>
			{items.map((item) => (
				<li key={item.expenses.id} style={{ marginTop: 10 }}>
					<div>
						<Link prefetch={false} href={`/expenses/${item.expenses.id}`}>
							{JSON.stringify(item)}
						</Link>
						<form action={deleteExpense}>
							<input type="hidden" name="id" defaultValue={item.expenses.id} />
							<button type="submit">削除</button>
						</form>
					</div>
				</li>
			))}
		</ul>
	);
}
