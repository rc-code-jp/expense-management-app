import type { expenseCategories } from "@/database/schema";
import { saveExpense } from "../../actions/saveExpense";

type CategoryItem = typeof expenseCategories.$inferSelect;

export function ExpenseRegisterForm({
	categoryList,
}: {
	categoryList: CategoryItem[];
}) {
	return (
		<form action={saveExpense}>
			<div>
				<div>
					<label>
						<span>金額</span>
						<input type="text" name="amount" />
					</label>
				</div>
				<div>
					<label>
						<span>カテゴリー</span>
						<select name="categoryId">
							{categoryList.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</label>
				</div>
				<div>
					<label>
						<span>日付</span>
						<input type="date" name="date" />
					</label>
				</div>
				<div>
					<label>
						<span>時刻</span>
						<input type="time" name="time" />
					</label>
				</div>
				<div>
					<label>
						<span>メモ</span>
						<textarea
							name="note"
							style={{
								resize: "vertical",
							}}
						/>
					</label>
				</div>
				<div>
					<button type="submit">登録</button>
				</div>
			</div>
		</form>
	);
}
