import { PageTitle } from "@/components/layout/PageTitle";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<PageTitle>Account</PageTitle>
			<div>
				<div>
					<Link href="/expenses">History</Link>
				</div>
				<div>
					<Link href="/expenses/create">New Expense</Link>
				</div>
				<div>
					<Link href="/categories">Category</Link>
				</div>
			</div>
		</div>
	);
}
