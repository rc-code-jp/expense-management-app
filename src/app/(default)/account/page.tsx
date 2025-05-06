import { auth } from "@/auth";
import { FormButton } from "@/components/form/FormButton";
import { FormLabel } from "@/components/form/FormLabel";
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
			<PageTitle>アカウント</PageTitle>
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
								<FormButton buttonClassName="btn-primary">
									予算を保存
								</FormButton>
							</div>
						</form>
					</li>
					<li className="mt-6">
						<div>
							<FormLabel>カテゴリー設定</FormLabel>
							<p className="mt-2 flex">
								<Link href="/categories" className="btn btn-wide shadow-md">
									カテゴリー設定ページへ
								</Link>
							</p>
						</div>
					</li>
					<li className="mt-8">
						<div>
							<FormLabel>ログアウト</FormLabel>
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
