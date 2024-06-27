import { getTimezoneNow } from "@/lib/dateFns";
import { redirect } from "next/navigation";

export default function Page() {
	// 今月のカレンダーにリダイレクト
	const now = getTimezoneNow();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	return redirect(`/calendar/${year}-${month}`);
}
