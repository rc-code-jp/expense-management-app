import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ExpenseRegisterForm } from "../features/expenses/components/ExpenseRegisterForm";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { eq } from 'drizzle-orm';
import Link from "next/link";

export default async function Page() {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  const userId = session.user?.id!

  const res = await db.select().from(expenseCategories).where(eq(expenseCategories.userId, userId))

  return (
    <div>
      <h1>Register</h1>
      <ExpenseRegisterForm categoryList={res}></ExpenseRegisterForm>
      <div>
        <Link href="/histories">戻る</Link>
      </div>
    </div>
  );
}