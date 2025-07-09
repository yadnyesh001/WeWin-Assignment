import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);

const isWeekend = (date) => {
  const d = dayjs(date).day();
  return d === 6 || d === 0; 
};

export const findLongWeekends = (holidays) => {
  const longWeekends = [];

  holidays.forEach(holiday => {
    const date = dayjs(holiday.date);

    const prev = date.subtract(1, 'day');
    const next = date.add(1, 'day');
    const next2 = date.add(2, 'day');

    let sequence = [];

    if (date.day() === 5) {
      sequence = [date.format('YYYY-MM-DD'), next.format('YYYY-MM-DD'), next2.format('YYYY-MM-DD')];
    } else if (date.day() === 1) {
      sequence = [prev.subtract(1, 'day').format('YYYY-MM-DD'), prev.format('YYYY-MM-DD'), date.format('YYYY-MM-DD')];
    } else if (isWeekend(prev) && isWeekend(next)) {
      sequence = [prev.format('YYYY-MM-DD'), date.format('YYYY-MM-DD'), next.format('YYYY-MM-DD')];
    }

    if (sequence.length === 3) {
      longWeekends.push({
        holiday: holiday.name,
        start: sequence[0],
        end: sequence[2],
      });
    }
  });

  return longWeekends;
};

export const findNextLongWeekend = (holidays) => {
  const all = findLongWeekends(holidays);
  const today = dayjs();

  for (let weekend of all) {
    if (dayjs(weekend.start).isSameOrAfter(today)) {
      return weekend;
    }
  }

  return null;
};
