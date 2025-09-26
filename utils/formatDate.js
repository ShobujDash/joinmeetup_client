// utils/formatDate.js
export function formatDate(dateStr) {
  if (!dateStr) return "";

  // eStDateAndTime আসছে: "2025-07-30,10:30:00"
  // safe করার জন্য replace করি যেন browser parse করতে পারে
  const normalized = dateStr.replace(",", "T"); // => "2025-07-30T10:30:00"

  const date = new Date(normalized);
  if (isNaN(date)) return "Invalid Date";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
