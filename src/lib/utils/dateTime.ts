import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(
	dateString: string,
	format: string = 'MMMM D, YYYY',
	inputFormat?: string
): string {
	if (inputFormat) {
		return dayjs(dateString, inputFormat).format(format);
	}
	return dayjs(dateString).format(format);
}
