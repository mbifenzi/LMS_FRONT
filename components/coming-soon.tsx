'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { ArrowLeft, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComingSoonProps {
  title: string;
  description?: string;
  expectedDate?: string;
}

export function ComingSoon({
  title,
  description = "We're working hard to bring you this feature. Stay tuned for updates!",
  expectedDate,
}: ComingSoonProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('December 1, 2025 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-full flex-col rounded-4xl bg-gradient-to-br from-slate-50 to-blue-50 px-4 dark:from-gray-900 dark:to-slate-800">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-gray-900 md:text-8xl dark:text-white">
              {title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700 md:text-2xl dark:text-gray-300">
              {description}
            </p>
          </div>

          <div className="mx-auto mb-12 grid max-w-lg grid-cols-4 gap-4">
            {[
              {
                label: 'Days',
                value: timeLeft.days.toString().padStart(2, '0'),
              },
              {
                label: 'Hours',
                value: timeLeft.hours.toString().padStart(2, '0'),
              },
              {
                label: 'Minutes',
                value: timeLeft.minutes.toString().padStart(2, '0'),
              },
              {
                label: 'Seconds',
                value: timeLeft.seconds.toString().padStart(2, '0'),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-200/50 bg-white/70 p-4 backdrop-blur-sm dark:border-white/20 dark:bg-white/10"
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-4 text-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Astra Learn. All rights reserved.
        </div>
      </div>
    </div>
  );
}
