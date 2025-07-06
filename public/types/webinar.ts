export type WebinarStatus = "LIVE" | "UPCOMING";

export type Webinar = {
  id: string;
  title: string;
  description: string;
  category: string;
  level?: string;
  instructor: string;
  instructorTitle?: string;
  instructorImage?: string;
  attendees: number;
  maxAttendees: number;
  status: WebinarStatus;
  duration?: string;
  meetingLink: string;
  date?: string;
  time?: string;
  startDateTime: Date;
  price?: string;
  createdBy?: string;
};

export type NotificationParams = {
  title: string;
  message: string;
  type?: string;
  priority?: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
};
