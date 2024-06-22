import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";

export const create = async (data: FormData) => {
  'use server';
  const body = {
    amount: Number(data.get('amount')),
  };

  const session = await auth()
  const userId = session?.user?.id!

  await db.insert(expenses).values({ userId: userId, categoryId: '', amount: body.amount, note: 'test-data' })
}