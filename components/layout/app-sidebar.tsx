'use client';

import * as React from 'react';

import {
  Bell,
  BookOpen,
  Brain,
  Folder,
  LayoutDashboard,
  Settings2,
  Trophy,
} from 'lucide-react';

import { NavMain } from '@/components/layout/nav-main';
import { NavUser } from '@/components/layout/nav-user';
import { TeamSwitcher } from '@/components/layout/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Astra Learn',
      logo: '/favicon.ico',
      plan: 'Intranet',
    },
    {
      name: 'Student Portal',
      logo: BookOpen,
      plan: 'Education',
    },
    {
      name: 'Admin Panel',
      logo: Settings2,
      plan: 'Management',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Course Catalog',
      url: '/course-catalog',
      icon: Trophy,
    },
    {
      title: 'Quiz Catalog',
      url: '/quiz-catalog',
      icon: Brain,
    },
    {
      title: 'Quest Catalog',
      url: '/quest-catalog',
      icon: Trophy,
    },
    {
      title: 'Documentation',
      url: '/documentation',
      icon: Folder,
    },
  ],
  navBottom: [
    {
      title: 'Notifications',
      url: '/notifications',
      icon: Bell,
      badge: 3, // notification counter
    },
    {
      title: 'Help Center',
      url: '/help',
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="mt-auto">
          <NavMain items={data.navBottom} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
