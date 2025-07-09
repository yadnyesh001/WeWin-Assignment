import { fetchPublicHolidays } from '../services/holidayService.js';
import { findLongWeekends, findNextLongWeekend } from '../utils/weekendUtils.js';

export const getAllLongWeekends = async (req, res) => {
  const { countryCode } = req.params;
  const year = req.query.year || new Date().getFullYear();

  try {
    const holidays = await fetchPublicHolidays(countryCode, year);
    const longWeekends = findLongWeekends(holidays);
    res.status(200).json({ year, countryCode, longWeekends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to fetch long weekends" });
  }
};

export const getNextLongWeekend = async (req, res) => {
  const { countryCode } = req.params;
  const year = req.query.year || new Date().getFullYear();

  try {
    const holidays = await fetchPublicHolidays(countryCode, year);
    const nextWeekend = findNextLongWeekend(holidays);
    res.status(200).json({ countryCode, year, nextLongWeekend: nextWeekend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to fetch next long weekend" });
  }
};