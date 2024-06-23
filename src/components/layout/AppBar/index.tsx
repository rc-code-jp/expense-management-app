"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function AppBar({
	userImage,
}: {
	userImage?: string | null;
}) {
	const handleClickLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		closeMenu();
		const confirmed = confirm("Are you sure you want to logout?");
		if (!confirmed) return;
		await signOut();
	};

	const handleClickLink = () => {
		closeMenu();
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
							<Link href="/expenses/register" onClick={handleClickLink}>
								New Expense
							</Link>
						</li>
						<li>
							<Link href="/expenses" onClick={handleClickLink}>
								History
							</Link>
						</li>
						<li>
							<Link href="/account" onClick={handleClickLink}>
								Account
							</Link>
						</li>
						<li>
							<a href="/" onClick={handleClickLogout} className="">
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
