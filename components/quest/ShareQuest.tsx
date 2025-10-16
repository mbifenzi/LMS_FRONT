"use client";
import React, { useState, useEffect } from "react";
import { Check, Copy as CopyIcon } from "lucide-react";

interface ShareQuestProps {
  questId: string;
  className?: string;
}

export default function ShareQuest({ questId, className }: ShareQuestProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/quest-catalog/${questId}`);
    }
  }, [questId]);

  function copyLink() {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          "w-full h-10 rounded-md border border-border bg-background hover:bg-accent/50 text-sm font-medium transition-colors"
        }
      >
        Share
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border bg-card shadow-2xl p-6 sm:p-7 space-y-6">
            <div className="text-center space-y-2">
              <h2 id="share-title" className="text-lg font-semibold">
                Share Quest
              </h2>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-xl border bg-muted/50 p-2">
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={url}
                    className="flex-1 rounded-md border-0 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={copyLink}
                    aria-label={copied ? "Copied" : "Copy link"}
                    className="inline-flex items-center justify-center rounded-md border bg-background hover:bg-accent/50 text-sm font-medium transition-colors h-9 w-9"
                    title={copied ? "Copied" : "Copy"}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Copied tooltip */}
                {copied && (
                  <div className="absolute right-3 -top-2 translate-y-[-100%] rounded-md bg-background border px-2 py-1 text-[11px] font-medium shadow-sm">
                    Copied!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
