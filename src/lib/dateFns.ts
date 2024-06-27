import * as _dateFns from "date-fns";
import { toZonedTime } from "date-fns-tz";

_dateFns.setDefaultOptions({
	weekStartsOn: 1, // 週の初めを月曜日に変更
});

export const getTimezoneNow = (tz = "Asia/Tokyo") => {
	return toZonedTime(new Date(), tz);
};

export const dateFns = _dateFns;
