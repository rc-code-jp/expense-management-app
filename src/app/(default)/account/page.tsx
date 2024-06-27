import { PageTitle } from "@/components/layout/PageTitle";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<PageTitle>Account</PageTitle>
			<div>
				<ul className="menu min-h-full w-full bg-base-200 p-4 text-base-content">
					<li>
						<Link href="/categories">Category</Link>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			</div>
		</div>
	);
}
