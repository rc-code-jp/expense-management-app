"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppBar({
	userImage,
}: {
	userImage?: string | null;
}) {
	const router = useRouter();

	const handleClickLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		closeMenu();
		const confirmed = confirm("Are you sure you want to logout?");
		if (!confirmed) return;
		await signOut();
	};

	const toLink = (e: React.MouseEvent, href: string) => {
		e.preventDefault();
		closeMenu();
		router.push(href);
	};

	const closeMenu = () => {
		const elem = document.activeElement as HTMLElement;
		if (elem) {
			elem?.blur();
		}
	};

	return (
		<div className="navbar mb-4 rounded-b-lg bg-neutral text-neutral-content shadow-xl">
			<div className="flex-1">
				<a href="/" className="btn btn-ghost text-xl">
					daisyUI
				</a>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							{userImage && <img alt="profile" src={userImage} />}
						</div>
					</div>
					<ul className="menu menu-sm dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 bg-neutral p-2 shadow">
						<li>
							<a
								href="/expenses/create"
								onClick={(e) => toLink(e, "/expenses/create")}
							>
								New Expense
							</a>
						</li>
						<li>
							<a href="/expenses" onClick={(e) => toLink(e, "/expenses")}>
								History
							</a>
						</li>
						<li>
							<a href="/report" onClick={(e) => toLink(e, "/report")}>
								Report
							</a>
						</li>
						<li>
							<a href="/account" onClick={(e) => toLink(e, "/account")}>
								Account
							</a>
						</li>
						<li>
							<a href="/auth/login" onClick={handleClickLogout}>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
