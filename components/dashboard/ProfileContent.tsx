import React from 'react';

import {
  Award as AwardIcon,
  type LucideIcon,
  Mail,
  MapPin,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
};

export type Profile = {
  name: string;
  avatar: string;
  exp: number;
  stars: number;
  achievements: Achievement[];
  skills: string[];
  highlights: string[];
  location?: string;
  email?: string;
};

type ProfileCardProps = {
  profile: Profile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  // Calculate level and XP progress
  // Formula: level = floor(exp / 100), XP to next level = exp % 100
  const level = Math.floor(profile.exp / 100);
  const currentLevelExp = profile.exp % 100;
  const expToNextLevel = 100;
  const progressPercentage = (currentLevelExp / expToNextLevel) * 100;

  return (
    <Card className="h-fit dark:bg-black">
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex-1 space-y-3 text-center lg:text-center">
          <div className="flex justify-center">
            <Avatar className="h-32 w-32 overflow-hidden rounded-full border sm:h-40 sm:w-40">
              <AvatarImage
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
              <AvatarFallback className="text-xl sm:text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold sm:text-xl">{profile.name}</h1>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">
                Level {level}
              </span>
              <span className="text-muted-foreground font-medium">
                {currentLevelExp}/{expToNextLevel} XP
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* EXP, Stars, Badges count */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:gap-3">
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
              <span className="font-medium">{profile.exp}</span>
              <span className="text-muted-foreground">exp</span>
            </div>
            <div className="text-muted-foreground">•</div>
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-orange-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.168L12 18.896l-7.336 3.868 1.402-8.168L.132 9.21l8.2-1.192L12 .587z" />
              </svg>
              <span className="font-medium">{profile.stars}</span>
              <span className="text-muted-foreground">stars</span>
            </div>
            <div className="text-muted-foreground">•</div>
            <div className="flex items-center gap-1">
              <AwardIcon className="h-4 w-4 text-red-500" />
              <span className="font-medium">{profile.achievements.length}</span>
              <span className="text-muted-foreground">badges</span>
            </div>
          </div>

          {/* Location and Email */}
          {(profile.location || profile.email) && (
            <div className="space-y-1 pt-2 text-sm">
              {profile.location && (
                <div className="flex items-center justify-start gap-1">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {profile.location}
                  </span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center justify-start gap-1">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {profile.email}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Badges */}
          <div className="border-t pt-3 pb-3">
            <h3 className="mb-2 text-left font-medium">Badges</h3>
            <TooltipProvider>
              <div className="flex flex-wrap justify-start gap-1 sm:gap-2">
                {profile.achievements.map((achievement) => (
                  <Tooltip key={achievement.id}>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <div className="dark:hover:bg-old-background flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-sm ring-1 ring-black/5 transition hover:scale-[1.02] hover:bg-white hover:shadow-md dark:ring-white/10">
                          <achievement.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-300 text-[10px] font-bold text-white">
                          x2
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {achievement.title}: {achievement.description}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>

          {/* Skills */}
          <div className="border-t pt-3 pb-3">
            <h4 className="mb-2 text-left font-medium">Skills</h4>
            <div className="flex flex-wrap justify-start gap-1 sm:gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="soft" size="sm" shape="pill">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="border-t pt-3 pb-3">
            <h4 className="mb-2 text-left font-medium">Highlights</h4>
            <div className="flex flex-wrap justify-start gap-1 sm:gap-2">
              {profile.highlights.map((highlight) => (
                <Badge key={highlight} variant="soft" size="sm" shape="pill">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
