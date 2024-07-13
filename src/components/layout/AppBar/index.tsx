"use client";
import { APP_NAME } from "@/utils/constants";
import Link from "next/link";

export function AppBar({
	userImage,
}: {
	userImage?: string | null;
}) {
	return (
		<div className="navbar md-width fixed z-30 mb-4 h-12 min-h-12 rounded-b-lg bg-neutral text-neutral-content shadow-xl">
			<div className="flex-1">
				<Link href="/" prefetch={false} className="btn btn-ghost text-xl">
					{APP_NAME}
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
