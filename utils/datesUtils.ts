export const getTimeDifference = (date: string) => {
  const now = new Date();
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const diffMs = Math.abs(now.getTime() - targetDate.getTime());

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  let result = [];
  if (diffDays > 0) result.push(`${diffDays}d`);
  if (diffHours > 0) result.push(`${diffHours}h`);
  if (diffMinutes > 0 || result.length === 0) result.push(`${diffMinutes}m`);

  const isFuture = targetDate > now;
  const prefix = isFuture ? "in " : "";
  const suffix = isFuture ? "" : " ago";

  return prefix + result.join(" ") + suffix;
};
