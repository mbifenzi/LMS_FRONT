interface DecorativeBackgroundProps {
  /** Which side of the screen to show decorations on */
  side?: "left" | "right";
  /** Color variant for the decorations */
  variant?: "blue" | "purple" | "green";
}

export function DecorativeBackground({ side = "left", variant = "blue" }: DecorativeBackgroundProps) {
  const sideClasses = side === "left" ? "lg:inset-y-0 lg:left-0 lg:right-1/2" : "lg:inset-y-0 lg:right-0 lg:left-1/2";

  const getColorClasses = (variant: string) => {
    switch (variant) {
      case "purple":
        return {
          circle: "border-purple-200/30 dark:border-purple-400/20",
          square: "from-purple-100/40 to-violet-100/40 dark:from-purple-500/10 dark:to-violet-500/10",
          dashed: "border-slate-300/50 dark:border-slate-600/30",
          dots: "bg-purple-400 dark:bg-purple-300",
          corner: "border-violet-300/40 dark:border-violet-400/30",
          line: "from-transparent via-purple-200/30 to-transparent dark:via-purple-400/20",
          gradients: {
            gradient1: { start: "#8b5cf6", end: "#a855f7" },
            gradient2: { start: "#d946ef", end: "#06b6d4" },
          },
        };
      case "green":
        return {
          circle: "border-green-200/30 dark:border-green-400/20",
          square: "from-green-100/40 to-emerald-100/40 dark:from-green-500/10 dark:to-emerald-500/10",
          dashed: "border-slate-300/50 dark:border-slate-600/30",
          dots: "bg-green-400 dark:bg-green-300",
          corner: "border-emerald-300/40 dark:border-emerald-400/30",
          line: "from-transparent via-green-200/30 to-transparent dark:via-green-400/20",
          gradients: {
            gradient1: { start: "#10b981", end: "#059669" },
            gradient2: { start: "#06b6d4", end: "#0891b2" },
          },
        };
      default: // blue
        return {
          circle: "border-blue-200/30 dark:border-blue-400/20",
          square: "from-blue-100/40 to-indigo-100/40 dark:from-blue-500/10 dark:to-indigo-500/10",
          dashed: "border-slate-300/50 dark:border-slate-600/30",
          dots: "bg-blue-400 dark:bg-blue-300",
          corner: "border-indigo-300/40 dark:border-indigo-400/30",
          line: "from-transparent via-blue-200/30 to-transparent dark:via-blue-400/20",
          gradients: {
            gradient1: { start: "#3b82f6", end: "#6366f1" },
            gradient2: { start: "#8b5cf6", end: "#06b6d4" },
          },
        };
    }
  };

  const colors = getColorClasses(variant);
  const gradientId1 = `gradient1-${variant}-${side}`;
  const gradientId2 = `gradient2-${variant}-${side}`;

  return (
    <div className={`absolute inset-0 ${sideClasses} pointer-events-none overflow-hidden`}>
      {/* Geometric shapes */}
      <div className={`absolute top-20 left-16 w-32 h-32 border ${colors.circle} rounded-full`}></div>
      <div className={`absolute top-40 right-20 w-24 h-24 bg-gradient-to-br ${colors.square} rounded-lg rotate-12`}></div>
      <div className={`absolute bottom-32 left-20 w-20 h-20 border-2 border-dashed ${colors.dashed} rounded-xl rotate-45`}></div>

      {/* Flowing lines */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 800" fill="none">
        <path d="M-50 100 Q100 150 150 200 T300 300 Q350 350 300 400 T150 500 Q100 550 200 600" stroke={`url(#${gradientId1})`} strokeWidth="2" opacity="0.3" fill="none" />
        <path d="M-20 200 Q80 250 130 300 T270 400 Q320 450 270 500 T130 600 Q80 650 180 700" stroke={`url(#${gradientId2})`} strokeWidth="1.5" opacity="0.2" fill="none" />
        <defs>
          <linearGradient id={gradientId1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.gradients.gradient1.start} />
            <stop offset="100%" stopColor={colors.gradients.gradient1.end} />
          </linearGradient>
          <linearGradient id={gradientId2} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.gradients.gradient2.start} />
            <stop offset="100%" stopColor={colors.gradients.gradient2.end} />
          </linearGradient>
        </defs>
      </svg>

      {/* Dotted pattern */}
      <div className="absolute top-1/4 left-1/4 grid grid-cols-6 gap-4 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`w-1 h-1 ${colors.dots} rounded-full`}></div>
        ))}
      </div>

      {/* Additional geometric elements */}
      <div className={`absolute bottom-20 right-16 w-16 h-16 border-l-4 border-t-4 ${colors.corner}`}></div>
      <div className={`absolute top-1/3 left-8 w-8 h-40 bg-gradient-to-b ${colors.line} transform -rotate-12`}></div>
    </div>
  );
}
