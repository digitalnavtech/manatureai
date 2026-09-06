import { Container } from "@/components/ui/Container";
import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";

export default function Loading() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="h-8 w-64 animate-pulse rounded bg-paper-warm" />
      <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-paper-warm" />
      <CardGridSkeleton count={6} />
    </Container>
  );
}
