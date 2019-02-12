export const dateInputFromDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
};

export const dateInputStringFromDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};