"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path ? "active" : "";
	};

	return (
		<div className="btm-nav md-width right-auto left-auto box-content h-12 bg-neutral pb-safe text-neutral-content">
			<Link href="/report" className={isActive("/report") ? "bg-primary" : ""}>
				<span className="btm-nav-label text-sm">レポート</span>
			</Link>
			<Link
				href="/items/create"
				className={isActive("/items/create") ? "bg-primary" : ""}
			>
				<span className="btm-nav-label text-sm">新規</span>
			</Link>
			<Link href="/items" className={isActive("/items") ? "bg-primary" : ""}>
				<span className="btm-nav-label text-sm">履歴</span>
			</Link>
			<Link
				href="/calendar"
				className={isActive("/calendar") ? "bg-primary" : ""}
			>
				<span className="btm-nav-label text-sm">カレンダー</span>
			</Link>
		</div>
	);
}
