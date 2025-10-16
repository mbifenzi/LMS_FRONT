"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      const targetDate = new Date("December 1, 2025 00:00:00").getTime();
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
    <div className="h-full rounded-4xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex flex-col px-4 relative">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12">
            {[
              {
                label: "Days",
                value: timeLeft.days.toString().padStart(2, "0"),
              },
              {
                label: "Hours",
                value: timeLeft.hours.toString().padStart(2, "0"),
              },
              {
                label: "Minutes",
                value: timeLeft.minutes.toString().padStart(2, "0"),
              },
              {
                label: "Seconds",
                value: timeLeft.seconds.toString().padStart(2, "0"),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-white/20"
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pb-4">
        <div className="text-gray-500 dark:text-gray-400 text-xs">
          © 2025 Astra Learn. All rights reserved.
        </div>
      </div>
    </div>
  );
}
