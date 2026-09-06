"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 sm:py-28">
      <ErrorState
        action={
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-forest px-6 py-3 text-sm font-medium text-forest"
            >
              Go home
            </Link>
          </div>
        }
      />
    </Container>
  );
}
