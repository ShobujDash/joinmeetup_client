export const isEventExpired = (start, end) => {
  const now = new Date();
  const startTime = new Date(start);
  const endTime = new Date(end);

  return now < startTime || now > endTime;
};

export const isEventEditExpired = (endDate) => {
  if (!endDate) return false;

  try {
    // "2025-07-30,10:30:00" -> ["2025-07-30", "10:30:00"]
    const [datePart, timePart] = endDate.split(",");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // JS Date -> month zero-based
    const eventEnd = new Date(year, month - 1, day, hour, minute, second);
    const now = new Date();

    console.log("eventEnd:", eventEnd);
    console.log("now:", now);

    return eventEnd < now;
  } catch (error) {
    console.error("Invalid date format:", endDate);
    return false;
  }
};
