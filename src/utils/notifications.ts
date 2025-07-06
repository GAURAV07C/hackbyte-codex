import { NotificationParams } from "@/types/webinar";

/**
 * Displays a notification to the user.
 * Replace this stub with your actual notification logic or import.
 */
export function showNotification(params: NotificationParams) {
  // Example: Replace with your notification system (toast, snackbar, etc.)
  alert(`${params.title}\n${params.message}`);
}
