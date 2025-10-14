import React from "react";
import ProfileCard from "@/components/dashboard/ProfileContent";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { dashboardData } from "@/lib/dashboard-data";
import { fetchCurrentUser } from "@/lib/api/user-api";

export default async function Dashboard() {
  // Fetch current user data
  const currentUser = await fetchCurrentUser();
  
  // Generate DiceBear avatar URL based on username or name
  const seed = currentUser?.username || currentUser?.name || "default";
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;
  
  // Merge user data with static data (keep static data for fields not in API response)
  const profile = {
    ...dashboardData.profile,
    name: currentUser?.name || dashboardData.profile.name,
    email: currentUser?.email || dashboardData.profile.email,
    avatar: avatarUrl,
  };

  // Use the role from API or fallback to Student
  const role = currentUser?.role || "Student";

  return (
    <div className="h-full w-full">
      <div className="">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-shrink-0 w-full lg:w-auto">
            <ProfileCard profile={profile} />
          </div>
          <div className="flex-1">
            <DashboardContent role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}
