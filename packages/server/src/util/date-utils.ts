export const dateTimeInputFromDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

export const dateInputFromDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const startDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
export const endDay = (date: Date) => new Date(date.setHours(23, 59, 59, 999));

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const durationToMinutes = (duration: string) =>
  Number(duration.slice(2, -1));
