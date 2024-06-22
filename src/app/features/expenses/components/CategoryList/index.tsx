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
					<Link prefetch={false} href={`/categories/${item.id}`}>
						{JSON.stringify(item)}
					</Link>
				</li>
			))}
		</ul>
	);
}
