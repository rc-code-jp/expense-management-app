import { auth } from "@/auth";
import { redirect } from "next/navigation";

// このページは使用しない
// 未ログインの場合はログインページにリダイレクト
// ログイン済みの場合はexpensesページにリダイレクト
export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}
	redirect("/expenses");
}
