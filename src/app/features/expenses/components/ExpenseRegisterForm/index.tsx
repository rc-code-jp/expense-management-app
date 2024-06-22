import { create } from "../../actions/create";

export function ExpenseRegisterForm() {
  return (
    <form action={create}>
      <div>
        <div>
          <label><span>金額</span><input type="text" name="amount" /></label>
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