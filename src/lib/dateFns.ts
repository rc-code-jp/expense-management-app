import * as _dateFns from "date-fns";
import { toZonedTime } from "date-fns-tz";

_dateFns.setDefaultOptions({
	weekStartsOn: 1, // 週の初めを月曜日に変更
});

export const getTimezoneNow = (tz = "Asia/Tokyo") => {
	return toZonedTime(new Date(), tz);
};

export const DATE_FORMAT = "yyyy-MM-dd";
export const TIME_FORMAT = "HH:mm";

export const WEEK_ARRAY = ["月", "火", "水", "木", "金", "土", "日"];

export const dateFns = _dateFns;
