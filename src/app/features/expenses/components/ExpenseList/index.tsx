import type { expenseCategories, expenses } from "@/database/schema";
import Link from "next/link";

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
					<Link prefetch={false} href={`/histories/${item.expenses.id}`}>
						{JSON.stringify(item)}
					</Link>
				</li>
			))}
		</ul>
	);
}
