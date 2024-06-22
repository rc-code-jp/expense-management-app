import { createExpense } from "../../actions/createExpense";

export function ExpenseRegisterForm({
  categoryList
}: {
  categoryList: any[]
}) {
  return (
    <form action={createExpense}>
      <div>
        <div>
          <label><span>金額</span><input type="text" name="amount" /></label>
        </div>
        <div>
          <label><span>日付</span><input type="date" name="date" /></label>
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
          <button type="submit">
            登録
          </button>
        </div>
      </div>
    </form>
  )
}