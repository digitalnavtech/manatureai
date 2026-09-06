import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or may have moved. Try one of the links below."
        action={
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper"
            >
              Back to homepage
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center rounded-full border border-forest px-6 py-3 text-sm font-medium text-forest"
            >
              Browse destinations
            </Link>
          </div>
        }
      />
    </Container>
  );
}
