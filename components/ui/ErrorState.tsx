interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again, or head back to the homepage.",
  action,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-border bg-surface px-6 py-16 text-center"
    >
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
