import React from "react";
import ProfileCard from "@/components/dashboard/ProfileContent";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { dashboardData } from "@/lib/dashboard-data";

export default function Dashboard() {
  // Use mock user role - you can change this as needed
  const role = "Student";

  return (
    <div className="h-full w-full">
      <div className="">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-shrink-0 w-full lg:w-auto">
            <ProfileCard profile={dashboardData.profile} />
          </div>
          <div className="flex-1">
            <DashboardContent role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}
