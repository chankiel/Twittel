import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function diffNow(datetime_post:Date){
  const now = new Date();
  let timeType = "s";
  let diffTime = Math.floor(
    (now.getTime() - datetime_post.getTime()) / 1000
  );
  if (diffTime > 3600) {
    diffTime = Math.floor(diffTime / 3600);
    timeType = "j";
  } else if (diffTime > 60) {
    diffTime = Math.floor(diffTime / 60);
    timeType = "m";
  } else if (diffTime == 0) {
    timeType = "now";
  }
  const diffString = (timeType==="now" ? timeType:diffTime+timeType) 
  return diffString;
}

export const formatDate = (date: Date): string => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formattedTime = date.toLocaleString('en-US', timeOptions);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleString('en-US', dateOptions);

  return `${formattedTime} · ${formattedDate}`;
};
