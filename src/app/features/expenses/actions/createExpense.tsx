import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { redirect } from "next/navigation";

export const createExpense = async (data: FormData) => {
  'use server';
  const body = {
    amount: Number(data.get('amount')),
    date: data.get('date') as string,
    categoryId: data.get('categoryId') as string,
  };

  // 簡易的なバリデーション（zodなどでやるのがベスト）
  if (isNaN(body.amount) || body.amount <= 0) {
    return { message: `金額は0以上で入力してください`, status: 422 }
  }

  if (!body.date) {
    return { message: `日付を入力してください`, status: 422 }
  }

  if (!body.categoryId) {
    return { message: `カテゴリーを選択してください`, status: 422 }
  }

  const session = await auth()
  const userId = session?.user?.id!

  await db.insert(expenses).values({ 
    userId: userId, 
    categoryId: body.categoryId,
    amount: body.amount, 
    date: body.date,
    note: 'test-data'
  })

  redirect('/histories')
}