export function getTimeUntilStart(startDateTime: Date): string {
  const now = new Date();
  const diff = startDateTime.getTime() - now.getTime();

  if (diff <= 0) return "Live Now";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  if (minutes > 0) return `Starts in ${minutes}m`;
  return "Starting soon";
}
