import { deleteExpenseCategory } from "@/app/features/expenses/actions/deleteExpenseCaterogy";
import type { expenseCategories } from "@/database/schema";
import Link from "next/link";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryList({
	items,
}: {
	items: Item[];
}) {
	return (
		<ul>
			{items.map((item) => (
				<li key={item.id} style={{ marginTop: 10 }}>
					<div>
						<Link prefetch={false} href={`/categories/${item.id}`}>
							{JSON.stringify(item)}
						</Link>
						<form action={deleteExpenseCategory}>
							<input type="hidden" name="id" defaultValue={item.id} />
							<button type="submit">削除</button>
						</form>
					</div>
				</li>
			))}
		</ul>
	);
}
