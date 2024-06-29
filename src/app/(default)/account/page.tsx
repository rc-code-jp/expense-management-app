import { auth } from "@/auth";
import { FormButton } from "@/components/form/FormButton";
import { FormText } from "@/components/form/FormText";
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
							<FormText
								label="Monthly Budget"
								name={"monthlyBudget"}
								defaultValue={user.monthlyBudget ?? ""}
							/>
							<div className="flex">
								<FormButton>Save Budget</FormButton>
							</div>
						</form>
					</li>
					<li className="mt-8">
						<div>
							<label>Category Setting</label>
							<p className="mt-2 flex">
								<Link href="/categories" className="btn btn-wide shadow-md">
									Go Category Setting Page
								</Link>
							</p>
						</div>
					</li>
					<li className="mt-8">
						<div>
							<label>Logout</label>
							<p className="mt-2 flex">
								<LogoutButton />
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
