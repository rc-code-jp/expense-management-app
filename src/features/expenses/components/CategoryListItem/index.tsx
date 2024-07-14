"use client";

import type { expenseCategories } from "@/database/schema";
import { swal } from "@/lib/sweetalert";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { useFormState } from "react-dom";
import { formActionState } from "../../actionState/formActionState";
import { deleteExpenseCategory } from "../../actions/deleteExpenseCategory";

type Item = typeof expenseCategories.$inferSelect;

export function CategoryListItem({
	item,
}: {
	item: Item;
}) {
	const [_formState, formDispatch] = useFormState(
		deleteExpenseCategory,
		formActionState,
	);

	const deleteAction = async (formData: FormData) => {
		const { isConfirmed } = await swal.confirm({
			text: "Are you sure?",
		});
		if (!isConfirmed) return;
		formDispatch(formData);
	};

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: item.id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		cursor: "default",
	};

	return (
		<li className="mt-4" ref={setNodeRef} {...attributes} style={style}>
			<div className="relative size-full rounded-md border border-primary/5 p-4 shadow-md">
				<div className="flex flex-nowrap items-center gap-4">
					<button
						type="button"
						className="z-10 cursor-move touch-none select-none space-y-1"
						{...listeners}
					>
						<div className="h-0.5 w-4 bg-gray-600" />
						<div className="h-0.5 w-4 bg-gray-600" />
						<div className="h-0.5 w-4 bg-gray-600" />
					</button>
					<Link
						prefetch={false}
						href={`/categories/${item.id}`}
						style={{
							color: item.color ?? "black",
						}}
						className="link"
					>
						{item.name}
					</Link>
				</div>
				<form
					action={deleteAction}
					className="-translate-y-1/2 absolute top-1/2 right-2"
				>
					<input type="hidden" name="id" defaultValue={item.id} />
					<button type="submit" className="btn btn-error btn-outline btn-xs">
						Delete
					</button>
				</form>
			</div>
		</li>
	);
}
