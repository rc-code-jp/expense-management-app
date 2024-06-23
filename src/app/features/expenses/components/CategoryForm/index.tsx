import { saveExpenseCategory } from "@/app/features/expenses/actions/saveExpenseCategory";
import type { expenseCategories } from "@/database/schema";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryForm({
	item,
}: {
	item?: Item;
}) {
	return (
		<form action={saveExpenseCategory}>
			<div>
				<input type="hidden" name="id" defaultValue={item?.id} />
				<div>
					<label>
						<span>カテゴリー名</span>
						<input type="text" name="name" defaultValue={item?.name} />
					</label>
				</div>
				<div>
					<label>
						<span>カラー</span>
						<input type="color" name="color" defaultValue={item?.color ?? ""} />
					</label>
				</div>
				<div>
					<button type="submit">登録</button>
				</div>
			</div>
		</form>
	);
}
