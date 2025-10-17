'use client';

import { usePathname } from 'next/navigation';

import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { extractNameFromSlug } from '@/lib/utils/slug';

// Map of routes to display names
const routeNames: Record<string, string> = {
  '': 'Dashboard',
  'course-catalog': 'Course Catalog',
  'quiz-catalog': 'Quiz Catalog',
  'quest-catalog': 'Quest Catalog',
  quest: 'Quest',
  documentation: 'Documentation',
  help: 'Help Center',
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Split pathname into segments and filter out empty strings
  const segments = pathname.split('/').filter((segment) => segment !== '');

  // If we're on the root/dashboard, show simple breadcrumb
  if (segments.length === 0 || pathname === '/') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home/Dashboard link */}
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = '/' + segments.slice(0, index + 1).join('/');

          // Check if segment contains an ID (slug format: name-id)
          // If it's a slug with ID, extract the name for display
          let displayName: string;

          if (routeNames[segment]) {
            // It's a known route
            displayName = routeNames[segment];
          } else if (segment.match(/-\d+$/)) {
            // It's a slug with ID at the end (e.g., "react-basics-123")
            displayName = extractNameFromSlug(segment);
          } else {
            // Format the segment normally
            displayName = segment
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          }

          return (
            <div key={segment} className="flex items-center gap-2">
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
