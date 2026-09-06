interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
