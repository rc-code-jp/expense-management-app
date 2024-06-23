import { FormButton } from "@/components/form/FormButton";
import { FormDate } from "@/components/form/FormDate";
import { FormSelect } from "@/components/form/FormSelect";
import { FormText } from "@/components/form/FormText";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormTime } from "@/components/form/FormTime";
import type { expenseCategories } from "@/database/schema";
import { saveExpense } from "@/features/expenses/actions/saveExpense";

type CategoryItem = typeof expenseCategories.$inferSelect;

export function ExpenseRegisterForm({
	categoryList,
}: {
	categoryList: CategoryItem[];
}) {
	return (
		<form action={saveExpense}>
			<div>
				<FormText name="amount" label="金額" defaultValue="" required />
			</div>
			<div>
				<FormSelect
					label="カテゴリー"
					name="categoryId"
					required
					options={categoryList.map((category) => ({
						value: category.id,
						text: category.name,
					}))}
				/>
			</div>
			<div>
				<FormDate name="date" label="日付" defaultValue="" required />
			</div>
			<div>
				<FormTime name="time" label="時刻" defaultValue="" />
			</div>
			<div>
				<FormTextarea name="note" label="メモ" defaultValue="" />
			</div>
			<div className="mt-6">
				<FormButton>登録</FormButton>
			</div>
		</form>
	);
}
