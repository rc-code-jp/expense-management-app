"use client";

import { swal } from "@/lib/sweetalert";
import { signOut } from "next-auth/react";

export function LogoutButton() {
	const logout = async () => {
		const { isConfirmed } = await swal.confirm({
			text: "ログアウトしますか？",
		});
		if (isConfirmed) {
			signOut({ callbackUrl: "/auth/login" });
		} else {
			// フォーカスを外す
			(document.activeElement as HTMLElement)?.blur();
		}
	};

	return (
		<button
			type="button"
			onClick={logout}
			className="btn btn-wide btn-outline shadow-md"
		>
			ログアウト
		</button>
	);
}
