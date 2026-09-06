import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: ResponsiveImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
