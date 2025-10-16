'use client';

import React, { useEffect, useState } from 'react';

import { Check, Copy as CopyIcon } from 'lucide-react';

interface ShareQuestProps {
  questId: string;
  className?: string;
}

export default function ShareQuest({ questId, className }: ShareQuestProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
          'border-border bg-background hover:bg-accent/50 h-10 w-full rounded-md border text-sm font-medium transition-colors'
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
          <div className="bg-card relative z-10 w-full max-w-lg space-y-6 rounded-2xl border p-6 shadow-2xl sm:p-7">
            <div className="space-y-2 text-center">
              <h2 id="share-title" className="text-lg font-semibold">
                Share Quest
              </h2>
            </div>

            <div className="space-y-2">
              <div className="bg-muted/50 relative rounded-xl border p-2">
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={url}
                    className="flex-1 rounded-md border-0 bg-transparent px-3 py-2 text-sm focus:ring-0 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={copyLink}
                    aria-label={copied ? 'Copied' : 'Copy link'}
                    className="bg-background hover:bg-accent/50 inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors"
                    title={copied ? 'Copied' : 'Copy'}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Copied tooltip */}
                {copied && (
                  <div className="bg-background absolute -top-2 right-3 translate-y-[-100%] rounded-md border px-2 py-1 text-[11px] font-medium shadow-sm">
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
