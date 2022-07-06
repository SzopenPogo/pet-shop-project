import { FORMAT_TO_DATE, FORMAT_TO_FULL_DATE, FORMAT_TO_TIME } from "../../constants/date";
import { formatDateDigit } from "./formatDateDigit";

export const formatBackendDate = (date: string, type: string) => {
  const objectDate = new Date(date);

  const day = +objectDate.getDay();
  const month = +objectDate.getMonth();
  const year = +objectDate.getFullYear();

  const hours = objectDate.getHours();
  const minutes = objectDate.getMinutes();
  const seconds = objectDate.getSeconds();

  const formatedDate = `
  ${formatDateDigit(day)}.${formatDateDigit(month)}.${year}`;

  const formatedTime = `
  ${hours}:${formatDateDigit(+minutes)}:${formatDateDigit(+seconds)}`;

  switch (type) {
    case FORMAT_TO_FULL_DATE: 
      return `${formatedDate} ${formatedTime}`;
    case FORMAT_TO_DATE: 
      return formatedDate;
    case FORMAT_TO_TIME: 
      return formatedTime;
    default:
      break;
  }

  return '';
}