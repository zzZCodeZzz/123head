import {format as dateFnsFormat} from "date-fns";

export function formatDate(date: Date | number | undefined | null, format ="dd.MM.yyyy HH:mm" ) {
    return date ? dateFnsFormat(date, format) : "";
}
