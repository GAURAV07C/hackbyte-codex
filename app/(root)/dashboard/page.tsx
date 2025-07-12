"use client";

import { OverviewTab } from "@/components/dashboard/overview-tab";

export default function DashboardPage() {
  const user: object[] = [];
  if (!user) {
    return null;
  }

  return (
    <div>
      <OverviewTab />
    </div>
  );
}
