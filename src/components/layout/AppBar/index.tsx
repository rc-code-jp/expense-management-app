"use client";
import Link from "next/link";

export function AppBar({
	userImage,
}: {
	userImage?: string | null;
}) {
	return (
		<div className="navbar mb-4 rounded-b-lg bg-neutral text-neutral-content shadow-xl">
			<div className="flex-1">
				<a href="/" className="btn btn-ghost text-xl">
					App
				</a>
			</div>
			<Link
				prefetch={true}
				href="/account"
				className="block w-10 overflow-hidden rounded-full"
			>
				{userImage && <img alt="profile" src={userImage} />}
			</Link>
		</div>
	);
}
