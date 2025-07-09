import axios from 'axios';

export const fetchPublicHolidays = async (countryCode, year) => {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error(`Unexpected response format: ${JSON.stringify(data)}`);
    }

    return data.map(holiday => ({
      date: holiday.date,
      localName: holiday.localName,
      name: holiday.name
    }));
  } catch (err) {
    throw new Error(
      `Failed to fetch holidays: ${err.response?.data?.detail || err.message}`
    );
  }
};