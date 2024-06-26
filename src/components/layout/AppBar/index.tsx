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
				<Link href="/" prefetch={false} className="btn btn-ghost text-xl">
					My Expenditure
				</Link>
			</div>
			<Link
				href="/account"
				prefetch={true}
				className="block w-7 overflow-hidden rounded-full"
			>
				{userImage && <img alt="profile" src={userImage} />}
			</Link>
		</div>
	);
}
