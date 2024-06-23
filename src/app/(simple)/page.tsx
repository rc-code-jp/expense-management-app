import Link from "next/link";

export default function Page() {
	return (
		<div>
			<Link href="/auth/login">ログイン</Link>
			<div className="p-10">
				<button type="button" className="btn btn-primary">
					Button
				</button>
			</div>
		</div>
	);
}
