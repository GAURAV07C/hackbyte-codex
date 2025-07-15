"use client";

import { OverviewTab } from "@/components/dashboard/overview-tab";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const {data: session} = useSession();

  const user = session?.user;

  if (!user ) {
    return <div className="text-center text-white p-4">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-screen-xl mx-auto">
      <OverviewTab />
    </div>
  );
}
