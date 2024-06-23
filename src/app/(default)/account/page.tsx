import Link from "next/link";

export default function Page() {
	return (
		<div>
			<h1>Account</h1>
			<div>
				<div>
					<Link href="/expenses">履歴</Link>
				</div>
				<div>
					<Link href="/expenses/register">登録</Link>
				</div>
				<div>
					<Link href="/categories">カテゴリー</Link>
				</div>
			</div>
		</div>
	);
}
