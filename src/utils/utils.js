const ISODateString = (date) => {
  date = new Date(date);
  function prefix(number) {
    return number < 10 ? "0" + number : number;
  }
  return date.getUTCDate() +
    "/" +
    prefix(date.getUTCMonth() + 1) +
    "/" +
    date.getUTCFullYear() +
    " " +
    prefix(date.getUTCHours()) +
    ":" +
    prefix(date.getUTCMinutes());
}

export { ISODateString }