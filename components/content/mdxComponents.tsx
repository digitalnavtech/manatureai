import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 {...props} className="mt-10 font-display text-2xl text-ink first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="mt-8 font-display text-xl text-ink">
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="mt-4 leading-relaxed text-ink-muted first:mt-0">
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="mt-4 list-decimal space-y-2 pl-6 text-ink-muted">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="mt-6 rounded-r-lg border-l-4 border-forest bg-paper-warm px-5 py-4 text-ink"
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href = "", ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className="font-medium text-forest underline underline-offset-2">
          {children}
        </Link>
      );
    }
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-forest underline underline-offset-2"
      >
        {children}
      </a>
    );
  },
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-ink">
      {children}
    </strong>
  ),
  hr: (props) => <hr {...props} className="my-10 border-border" />,
  table: ({ children, ...props }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table {...props} className="w-full text-left text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th {...props} className="border-b border-border bg-paper-warm px-4 py-2.5 font-semibold text-ink">
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td {...props} className="border-b border-border px-4 py-2.5 text-ink-muted">
      {children}
    </td>
  ),
};
