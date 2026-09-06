import { formatDate } from "@/lib/utils/date";

interface AuthorBoxProps {
  author: string;
  publishedAt: string;
  updatedAt?: string;
}

export function AuthorBox({ author, publishedAt, updatedAt }: AuthorBoxProps) {
  const initials = author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-5">
      <div
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-paper"
      >
        {initials}
      </div>
      <div className="text-sm">
        <p className="font-semibold text-ink">Written by {author}</p>
        <p className="text-ink-muted">
          Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          {updatedAt ? (
            <>
              {" · "}Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}
