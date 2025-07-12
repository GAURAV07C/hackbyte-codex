// Simple registration logic using localStorage for demo purposes
export function registerForWebinar(id: string) {
  const key = "registeredWebinars";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  if (!existing.includes(id)) {
    existing.push(id);
    localStorage.setItem(key, JSON.stringify(existing));
  }
}

// Helper to check registration status
export function isRegistered(id: string) {
  const key = "registeredWebinars";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  return existing.includes(id);
}
