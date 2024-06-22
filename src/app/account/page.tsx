"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
	const { data: session, status } = useSession();

	return (
		<div>
			<h1>Account</h1>
			<p>{JSON.stringify(session, null, 2)}</p>
			<div>
				<div>
					<Link href="/histories">履歴</Link>
				</div>
				<div>
					<Link href="/register">登録</Link>
				</div>
				<div>
					<Link href="/categories">カテゴリー</Link>
				</div>
			</div>
		</div>
	);
}
