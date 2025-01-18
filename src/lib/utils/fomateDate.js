// DD MMM, YYYY format (local = "en-GB")

export const formatISODate = (
  isoDateString,
  locale = "en-GB",
  options = { day: "numeric", month: "short", year: "numeric" }
) => {
  if (!isoDateString) {
    return "Invalid Date";
  }

  try {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    return "Invalid Date";
  }
};
