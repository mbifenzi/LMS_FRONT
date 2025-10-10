"use client";
import Image from "next/image";
import { ApiQuest } from "@/types/types";
import { Clock, Timer, Flag, Star as StarIcon, Trophy, Loader2 } from "lucide-react";
import ShareQuest from "./ShareQuest";
import { useState } from "react";
import { registerQuest } from "@/lib/api/quest-register";

interface QuestProps {
  quest: ApiQuest;
}

export default function Quest({ quest }: QuestProps) {
  const cover = quest.cover_image_url && quest.cover_image_url.trim() !== "" ? quest.cover_image_url : "/images/default-img-um6P.png";
  const introVideo = quest.intro_video_url && quest.intro_video_url.trim() !== "" ? quest.intro_video_url : null;

  const [error, setError] = useState(false);
  const hasUrl = quest.cover_image_url && quest.cover_image_url.trim().length > 0;
  const showPlaceholder = !hasUrl || error;
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    if (isRegistering || isRegistered) return;
    setIsRegistering(true);
    const MIN_LOADING_MS = 500;
    const start = Date.now();
    try {
      const res = await registerQuest(quest.id);
      console.log("Register response:", res);
      setIsRegistered(true);
      // Optionally, refresh or route to quest page/tasks here
    } catch (e) {
      console.error("Failed to register for quest", e);
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed));
      }
      setIsRegistering(false);
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 md:py-10 container mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 break-words leading-tight">{quest.name}</h1>
      <div className="flex items-center gap-2 mb-6">
        <span className="px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 uppercase tracking-wide text-[11px] text-yellow-600 dark:text-yellow-400">{quest.difficulty}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-10 2xl:gap-14">
        <div className="w-full lg:flex-1 min-w-0 space-y-8 order-2 lg:order-1">
          <div className="relative w-full rounded-xl overflow-hidden bg-black flex items-center justify-center aspect-video max-h-[420px] md:max-h-[480px] 2xl:max-h-[520px]">
            <video src={introVideo || "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"} controls poster={cover} className="w-full h-full object-cover" />
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
            <div className="absolute top-2 right-3 text-[10px] font-semibold tracking-wide text-gray-300/90 bg-black/40 px-2 py-0.5 rounded">ljadid</div>
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-3 overflow-x-auto pb-2" aria-label="media thumbnails">
            <button className="relative w-24 h-14 sm:w-28 sm:h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-ring">
              {showPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-400 dark:text-gray-500"
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
                <Image src={quest.cover_image_url} alt="Cover thumbnail" fill className="object-cover" onError={() => setError(true)} />
              )}
            </button>
            {introVideo && (
              <button className="relative w-24 h-14 sm:w-28 sm:h-16 rounded-md overflow-hidden bg-muted border flex items-center justify-center text-[10px] text-muted-foreground flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-ring">
                Video
              </button>
            )}
          </div>
          {quest.description && <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-4xl whitespace-pre-line">{quest.description}</p>}

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-14 items-start">
            <div className="flex-1 min-w-[40%]">
              <h3 className="text-sm font-semibold mb-3 tracking-wide text-foreground">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {quest.reward_badges.length ? (
                  quest.reward_badges.map((b) => (
                    <span key={b} className="px-3 py-1 rounded-md bg-muted text-sm text-foreground border border-border/60">
                      {b.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
            </div>
            <div className="hidden sm:block w-px bg-border self-stretch" />
            <div className="flex-1 min-w-[40%]">
              <h3 className="text-sm font-semibold mb-3 tracking-wide text-foreground">Certificates</h3>
              <div className="flex flex-wrap gap-2">
                {quest.reward_certificates.length ? (
                  quest.reward_certificates.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-md bg-muted text-sm text-foreground border border-border/60">
                      {c.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-1/2 lg:w-1/4 2xl:w-[320px] space-y-4 flex-shrink-0 order-1 lg:order-2 lg: lg:top-6 self-start">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            {showPlaceholder ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-400 dark:text-gray-500"
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
              <Image src={quest.cover_image_url} alt={quest.name} fill className="object-cover" onError={() => setError(true)} />
            )}
          </div>
          <div>
            <span className="inline-block px-2 py-1 rounded-md bg-muted text-[10px] uppercase tracking-wide font-medium mb-4">{quest.status}</span>
            <div className="space-y-2.5">
              <button
                onClick={handleRegister}
                disabled={isRegistering}
                aria-busy={isRegistering}
                className={`w-full h-11 rounded-md disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors ${
                  isRegistered ? "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600" : "bg-sky-500 hover:bg-sky-400 active:bg-sky-500"
                }`}
              >
                {isRegistering ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registering...
                  </span>
                ) : isRegistered ? (
                  "Start"
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
          <div className=" text-[13px]">
            <div className="flex items-center justify-between gap-4 py-2 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Estimated Dur</span>
              </div>
              <span className="font-medium tabular-nums">{quest.estimated_duration}h</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="w-4 h-4" />
                <span>Total Dur</span>
              </div>
              <span className="font-medium">{quest.total_duration ?? "—"}h</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Flag className="w-4 h-4" />
                <span>Prereq Pts</span>
              </div>
              <span className="font-medium tabular-nums">{quest.prerequicite_points}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <StarIcon className="w-4 h-4" />
                <span>Reward Pts</span>
              </div>
              <span className="font-medium tabular-nums">{quest.reward_points}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="w-4 h-4" />
                <span>Total Pts</span>
              </div>
              <span className="font-medium">{quest.total_points ?? "—"}</span>
            </div>
          </div>
          <ShareQuest questId={quest.id} />
        </div>
      </div>
    </div>
  );
}
