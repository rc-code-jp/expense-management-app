import sweetAlert, {
	type SweetAlertOptions,
	type SweetAlertIcon,
} from "sweetalert2";

// ベースとなるスタイルを調整
const base = sweetAlert.mixin({
	confirmButtonColor: "#84C98B",
	cancelButtonColor: "#999999",
	denyButtonColor: "#cc3333",
});

const fire = (options: SweetAlertOptions) => {
	return sweetAlert.fire(options);
};

const Confirm = base.mixin({
	showCancelButton: true,
	confirmButtonText: "OK",
	cancelButtonText: "Cancel",
});

const confirm = (params?: {
	title?: string;
	text?: string;
	confirmButtonText?: string;
}) => {
	return Confirm.fire({
		title: params?.title || "Confirm",
		text: params?.text || "Are you sure?",
		confirmButtonText: params?.confirmButtonText || "OK",
	});
};

const alert = (params: { text: string; icon?: SweetAlertIcon }) => {
	return base.fire({
		title: " ",
		icon: params.icon ?? "success",
		confirmButtonText: "OK",
		text: params.text,
	});
};

const Toast = base.mixin({
	toast: true,
	position: "top-start",
	padding: "0.5rem 1rem",
	showConfirmButton: false,
	timer: 3000,
});

const toast = (title: string, icon: SweetAlertIcon = "success") => {
	return Toast.fire({
		title,
		icon,
	});
};

export const swal = {
	fire,
	confirm,
	alert,
	toast,
};
