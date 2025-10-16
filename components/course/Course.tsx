'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Clock,
  Flag,
  Loader2,
  Star as StarIcon,
  Timer,
  Trophy,
} from 'lucide-react';

import { Course as CourseType } from '@/lib/mock-data/courses';

import ShareCourse from './ShareCourse';

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

interface CourseProps {
  course: CourseType;
}

export default function Course({ course }: CourseProps) {
  const cover =
    course.coverImage && course.coverImage.trim() !== ''
      ? course.coverImage
      : '/images/default-img-um6P.png';
  const introVideo = null; // Mock data doesn't have intro video

  const [error, setError] = useState(false);
  const hasUrl = course.coverImage && course.coverImage.trim().length > 0;
  const showPlaceholder = !hasUrl || error;
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 md:py-10">
      <h1 className="mb-3 text-3xl leading-tight font-extrabold tracking-tight break-words md:text-4xl">
        {course.name}
      </h1>
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-[11px] tracking-wide text-yellow-600 uppercase dark:text-yellow-400">
          {course.difficulty}
        </span>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start 2xl:gap-14">
        <div className="order-2 w-full min-w-0 space-y-8 lg:order-1 lg:flex-1">
          <div className="relative flex aspect-video max-h-[420px] w-full items-center justify-center overflow-hidden rounded-xl bg-black md:max-h-[480px] 2xl:max-h-[520px]">
            <video
              src={
                introVideo ||
                'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
              }
              controls
              poster={cover}
              className="h-full w-full object-cover"
            />
            {/* {showPlaceholder && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-gray-400 dark:text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )} */}
            <div className="absolute top-2 right-3 rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-gray-300/90">
              ljadid
            </div>
          </div>

          {/* Thumbnails row */}
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            aria-label="media thumbnails"
          >
            <button className="bg-muted focus:ring-ring relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-md focus:ring-2 focus:outline-none sm:h-16 sm:w-28">
              {showPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-400 dark:text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={course.coverImage || cover}
                  alt="Cover thumbnail"
                  fill
                  className="object-cover"
                  onError={() => setError(true)}
                />
              )}
            </button>
            {introVideo && (
              <button className="bg-muted text-muted-foreground focus:ring-ring relative flex h-14 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border text-[10px] focus:ring-2 focus:outline-none sm:h-16 sm:w-28">
                Video
              </button>
            )}
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
          <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            {showPlaceholder ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 text-gray-400 dark:text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            ) : (
              <Image
                src={course.coverImage || cover}
                alt={course.name}
                fill
                className="object-cover"
                onError={() => setError(true)}
              />
            )}
          </div>
          <div>
            <span className="bg-muted mb-4 inline-block rounded-md px-2 py-1 text-[10px] font-medium tracking-wide uppercase">
              {course.status}
            </span>
            <div className="space-y-2.5">
              <button
                onClick={handleRegister}
                disabled={isRegistering}
                aria-busy={isRegistering}
                className={`h-11 w-full rounded-md text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  isRegistered
                    ? 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600'
                    : 'bg-sky-500 hover:bg-sky-400 active:bg-sky-500'
                }`}
              >
                {isRegistering ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Registering...
                  </span>
                ) : isRegistered ? (
                  'Start'
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </div>
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
          <ShareCourse courseId={course.id.toString()} />
        </div>
      </div>
    </div>
  );
}
