"use client";

import type { expenseCategories } from "@/database/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ItemType = typeof expenseCategories.$inferSelect;

export function CategoryFilter({
	items,
	initialValue,
}: {
	items: ItemType[];
	initialValue?: typeof expenseCategories.$inferSelect.id;
}) {
	const router = useRouter();
	const [value, setValue] = useState<string>(initialValue ?? "");

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setValue(e.target.value);
		const url = new URL(location.href);
		url.searchParams.set("category", e.target.value);
		router.push(url.href);
	};

	return (
		<div>
			<select
				className="select select-ghost select-xs w-full max-w-xs text-right"
				value={value}
				onChange={handleChange}
			>
				<option>All Category</option>
				{items.map((item) => (
					<option key={item.id} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
}
