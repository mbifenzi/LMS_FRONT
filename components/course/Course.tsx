'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Check,
  Clock,
  Flag,
  Loader2,
  Share2,
  Star as StarIcon,
  Timer,
  Trophy,
} from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Course as CourseType } from '@/lib/mock-data/courses';

// Client-side registration handler for mock data
const registerCourse = async (
  courseId: string
): Promise<{ success: boolean; message?: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock successful registration
  console.log(`Mock registration for course: ${courseId}`);
  return { success: true, message: 'Successfully registered for course' };
};

// Helper function to get status badge variant
const getStatusVariant = (
  status: CourseType['status']
):
  | 'available'
  | 'inProgress'
  | 'notStarted'
  | 'paused'
  | 'abandoned'
  | 'completed' => {
  return status as
    | 'available'
    | 'inProgress'
    | 'notStarted'
    | 'paused'
    | 'abandoned'
    | 'completed';
};

// Helper function to get difficulty badge variant
const getDifficultyVariant = (
  difficulty: CourseType['difficulty']
): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  return difficulty.toLowerCase() as
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'expert';
};

// Helper function to format status for display
const formatStatus = (status: CourseType['status']): string => {
  const statusMap: Record<CourseType['status'], string> = {
    available: 'Available',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    paused: 'Paused',
    abandoned: 'Abandoned',
    completed: 'Completed',
  };
  return statusMap[status];
};

interface CourseProps {
  course: CourseType;
}

export default function Course({ course }: CourseProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [copied, setCopied] = useState(false);

  const cover =
    course.coverImage && course.coverImage.trim() !== ''
      ? course.coverImage
      : '/images/default-img-um6P.png';
  const introVideo = null; // Mock data doesn't have intro video

  const handleRegister = async () => {
    if (isRegistering || isRegistered) return;
    setIsRegistering(true);
    const MIN_LOADING_MS = 500;
    const start = Date.now();
    try {
      const res = await registerCourse(course.id.toString());
      console.log('Register response:', res);
      setIsRegistered(true);
      // Optionally, refresh or route to course page/quizzes here
    } catch (e) {
      console.error('Failed to register for course', e);
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed));
      }
      setIsRegistering(false);
    }
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}/course-catalog/${course.id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied!', {
        description: 'Course link has been copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy', {
        description: 'Please try again.',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 md:py-10">
      <h1 className="mb-3 text-3xl leading-tight font-extrabold tracking-tight break-words md:text-4xl">
        {course.name}
      </h1>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={getDifficultyVariant(course.difficulty)} size="md">
            {course.difficulty}
          </Badge>
          <Badge variant={getStatusVariant(course.status)} size="md">
            {formatStatus(course.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRegister}
            disabled={isRegistering}
            className={`${
              isRegistered
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-sky-500 hover:bg-sky-400'
            }`}
          >
            {isRegistering ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : isRegistered ? (
              'Start'
            ) : (
              'Register'
            )}
          </Button>
          <Button
            onClick={handleShare}
            size="icon"
            variant="outline"
            title="Share course"
            className="relative"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start 2xl:gap-14">
        <div className="order-2 w-full min-w-0 space-y-8 lg:order-1 lg:flex-1">
          <div className="relative flex aspect-video max-h-[420px] w-full items-center justify-center overflow-hidden rounded-xl bg-black md:max-h-[480px] 2xl:max-h-[520px]">
            {course.coverImage !== typeof '' ? (
              <video
                src={
                  introVideo ||
                  'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
                }
                controls
                poster={cover}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={course.coverImage}
                alt={course.name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute top-2 right-3 rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-gray-300/90">
              ljadid
            </div>
          </div>
          {course.description && (
            <p className="text-muted-foreground max-w-4xl text-sm leading-relaxed whitespace-pre-line md:text-base">
              {course.description}
            </p>
          )}

          <div className="flex flex-col items-start gap-10 sm:flex-row sm:gap-14">
            <div className="min-w-[40%] flex-1">
              <h3 className="text-foreground mb-3 text-sm font-semibold tracking-wide">
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.length ? (
                  course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-foreground border-border/60 rounded-md border px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </div>
            </div>
            <div className="bg-border hidden w-px self-stretch sm:block" />
            <div className="min-w-[40%] flex-1">
              <h3 className="text-foreground mb-3 text-sm font-semibold tracking-wide">
                Certificates
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-muted-foreground text-xs">
                  Certificate available upon completion
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg: order-1 h-1/2 w-full flex-shrink-0 space-y-4 self-start lg:top-6 lg:order-2 lg:w-1/4 2xl:w-[320px]">
          <div className="text-[13px]">
            <div className="flex items-center justify-between gap-4 border-b py-2">
              <div className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Estimated Dur</span>
              </div>
              <span className="font-medium tabular-nums">
                {course.duration}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b py-3">
              <div className="text-muted-foreground flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span>Difficulty</span>
              </div>
              <span className="font-medium">{course.difficulty}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b py-3">
              <div className="text-muted-foreground flex items-center gap-2">
                <Flag className="h-4 w-4" />
                <span>Category</span>
              </div>
              <span className="font-medium tabular-nums">
                {course.category}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b py-3">
              <div className="text-muted-foreground flex items-center gap-2">
                <StarIcon className="h-4 w-4" />
                <span>Points</span>
              </div>
              <span className="font-medium tabular-nums">{course.points}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b py-3">
              <div className="text-muted-foreground flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Instructor</span>
              </div>
              <span className="font-medium">{course.instructor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
