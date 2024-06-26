"use client";
import Link from "next/link";

export function AppBar({
	userImage,
}: {
	userImage?: string | null;
}) {
	return (
		<div className="navbar fixed z-30 mb-4 h-12 min-h-12 rounded-b-lg bg-neutral text-neutral-content shadow-xl md:w-[1024px]">
			<div className="flex-1">
				<a href="/" className="btn btn-ghost text-xl">
					App
				</a>
			</div>
			<Link
				prefetch={true}
				href="/account"
				className="block w-7 overflow-hidden rounded-full"
			>
				{userImage && <img alt="profile" src={userImage} />}
			</Link>
		</div>
	);
}
