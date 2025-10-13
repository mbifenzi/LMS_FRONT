"use client";

import * as React from "react";
import { BookOpen, HelpCircle, LayoutDashboard, Trophy, Frame, Map, PieChart, Settings2, SquareTerminal, Brain } from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavProjects } from "@/components/layout/nav-projects";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "user",
    email: "user@um6p.ma",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SASE Platform",
      logo: "/favicon.ico",
      plan: "Academic",
    },
    {
      name: "Student Portal",
      logo: BookOpen,
      plan: "Education",
    },
    {
      name: "Admin Panel",
      logo: Settings2,
      plan: "Management",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Course Catalog",
      url: "/course-catalog",
      icon: Trophy,
    },
    {
      title: "Quiz Catalog",
      url: "/quiz-catalog",
      icon: Brain,
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
      items: [
        {
          title: "FAQ",
          url: "/help",
        },
        {
          title: "Contact Support",
          url: "/help",
        },
        {
          title: "Getting Started",
          url: "/help",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookOpen,
      items: [
        {
          title: "User Guide",
          url: "/documentation",
        },
        {
          title: "Tutorials",
          url: "/documentation",
        },
        {
          title: "API Reference",
          url: "/documentation",
        },
        {
          title: "Best Practices",
          url: "/documentation",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
