"use client";

import type { expenseCategories } from "@/database/schema";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { set } from "date-fns";
import { ne } from "drizzle-orm";
import { useState } from "react";
import { sortExpenseCategory } from "../../actions/sortExpenseCategory";
import { CategoryListItem } from "../CategoryListItem";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryList({
	items,
}: {
	items: Item[];
}) {
	const [busy, setBusy] = useState(false);

	const onDragEnd = async (event: DragEndEvent) => {
		if (busy) return;
		setBusy(true);
		const { active, over } = event;
		if (over == null || active.id === over.id) {
			return;
		}

		// 並び替え後のitemsを取得
		const newItems = [...items];
		const activeIndex = newItems.findIndex((item) => item.id === active.id);
		const overIndex = newItems.findIndex((item) => item.id === over.id);
		const [removed] = newItems.splice(activeIndex, 1);
		newItems.splice(overIndex, 0, removed);

		const prevItem = newItems[overIndex - 1];
		const nextItem = newItems[overIndex + 1];

		// カテゴリーの並び順を更新
		const res = await sortExpenseCategory({
			categoryId: String(active.id),
			prevId: prevItem?.id,
			nextId: nextItem?.id,
		});
		if (res.message) {
			alert(res.message);
		}
		setBusy(false);
	};

	return (
		<ul>
			<DndContext id="expenseCategories" onDragEnd={onDragEnd}>
				<SortableContext items={items} disabled={busy}>
					{items.map((item) => (
						<CategoryListItem key={item.id} item={item} />
					))}
				</SortableContext>
			</DndContext>
		</ul>
	);
}
