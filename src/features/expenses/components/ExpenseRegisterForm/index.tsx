import { FormButton } from "@/components/form/FormButton";
import { FormDate } from "@/components/form/FormDate";
import { FormSelect } from "@/components/form/FormSelect";
import { FormText } from "@/components/form/FormText";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormTime } from "@/components/form/FormTime";
import type { expenseCategories, expenses } from "@/database/schema";
import { saveExpense } from "@/features/expenses/actions/saveExpense";
import { dateFns } from "@/lib/dateFns";

type CategoryItem = typeof expenseCategories.$inferSelect;
type ExpenseItem = typeof expenses.$inferSelect;

export function ExpenseRegisterForm({
	categoryList,
	item,
}: {
	categoryList: CategoryItem[];
	item: ExpenseItem;
}) {
	return (
		<form action={saveExpense}>
			<div>
				<FormText
					name="amount"
					label="Amount"
					defaultValue={item.amount || ""}
					required
				/>
			</div>
			<div>
				<FormSelect
					label="Category"
					name="categoryId"
					required
					defaultValue={item.categoryId ?? ""}
					options={categoryList.map((category) => ({
						value: category.id,
						text: category.name,
					}))}
				/>
			</div>
			<div>
				<FormDate
					name="date"
					label="Date"
					defaultValue={item.date ?? ""}
					required
				/>
			</div>
			<div>
				<FormTime name="time" label="Time" defaultValue={item.time ?? ""} />
			</div>
			<div>
				<FormTextarea name="note" label="Note" defaultValue={item.note ?? ""} />
			</div>
			<div className="mt-6">
				<FormButton>{item.id ? "Update" : "Save"}</FormButton>
			</div>
		</form>
	);
}
