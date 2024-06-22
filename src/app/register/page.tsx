import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ExpenseRegisterForm } from "../features/expenses/components/ExpenseRegisterForm";

export default async function Page() {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  return (
    <div>
      <h1>Register</h1>
      <p>
        Register
      </p>
      <ExpenseRegisterForm></ExpenseRegisterForm>
    </div>
  );
}