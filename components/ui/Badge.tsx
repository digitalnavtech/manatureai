import { cn } from "@/lib/utils/cn";

type Tone = "forest" | "sand" | "sun" | "outline";

const tones: Record<Tone, string> = {
  forest: "bg-forest text-paper",
  sand: "bg-sand/60 text-ink",
  sun: "bg-sun/15 text-sun",
  outline: "border border-border text-ink-muted",
};

export function Badge({
  children,
  tone = "sand",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
