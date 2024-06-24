import * as dateFns from "date-fns";

dateFns.setDefaultOptions({
	weekStartsOn: 1, // 週の初めを月曜日に変更
});

export { dateFns };
