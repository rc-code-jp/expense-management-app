import { auth } from "@/auth";
import { AppBar } from "@/components/layout/AppBar";
import { redirect } from "next/navigation";

export default async function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	return (
		<div className="w-full">
			<AppBar userImage={user?.image} />
			<div className="px-2">{children}</div>
		</div>
	);
}
