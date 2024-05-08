export function convertDateToString(stringDate: string, separator: string = '/'): string | null {
  const date = new Date(stringDate)

  if (date) {
    const day : string = date.getDate().toString().padStart(2, '0');
    const month : string = (date.getMonth() + 1).toString().padStart(2, '0');
    const year : string = date.getFullYear().toString();

    return `${year}${separator}${month}${separator}${day}`
  } else {
    return null
  }
}

export function secondsToDate(seconds : number): Date {
  return new Date(seconds * 1000);
}