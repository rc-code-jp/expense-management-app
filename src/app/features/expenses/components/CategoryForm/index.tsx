import { createExpenseCategory } from "../../actions/createExpenseCategory";

export function CategoryForm({
  item
}: {
  item?: any;
}) {
  return (
    <form action={createExpenseCategory}>
      <div>
        <div>
          <label><span>カテゴリー名</span><input type="text" name="name" defaultValue={item?.name}/></label>
        </div>
        <div>
          <label><span>カラー</span><input type="color" name="color" defaultValue={item?.color} /></label>
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