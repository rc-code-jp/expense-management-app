import * as _dateFns from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const TIME_ZONE = "Asia/Tokyo";

_dateFns.setDefaultOptions({
	weekStartsOn: 1, // 週の初めを月曜日に変更
});

export const getNow = () => {
	return toZonedTime(new Date(), TIME_ZONE);
};

export const dateFns = _dateFns;
