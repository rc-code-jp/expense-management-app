import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { saveMonthlyBudget } from "@/features/account/actions/saveMonthlyBudget";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	return (
		<div>
			<PageTitle>Account</PageTitle>
			<div>
				<ul>
					<li>
						<form action={saveMonthlyBudget}>
							<label>
								<span>Monthly Budget:</span>
								<input
									type="tel"
									name="monthlyBudget"
									defaultValue={user.monthlyBudget ?? ""}
									className="input w-full max-w-xs"
								/>
							</label>
						</form>
					</li>
					<li className="mt-4">
						<Link href="/categories">Category Setting</Link>
					</li>
					<li className="mt-6">
						<LogoutButton />
					</li>
				</ul>
			</div>
		</div>
	);
}
