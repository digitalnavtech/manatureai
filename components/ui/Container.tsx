import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Container({ children, className, as: As = "div" }: ContainerProps) {
  return (
    <As className={cn("mx-auto w-full max-w-content px-5 sm:px-8", className)}>
      {children}
    </As>
  );
}
