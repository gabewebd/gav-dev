"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends ImageProps {
  containerClassName?: string;
}

export default function OptimizedImage({
  className,
  containerClassName,
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${containerClassName || ""}`}>
      <Image
        className={`transition-all duration-700 ease-in-out ${
          isLoading 
            ? "scale-105 blur-lg grayscale opacity-0" 
            : "scale-100 blur-0 grayscale-0 opacity-100"
        } ${className || ""}`}
        onLoad={() => setIsLoading(false)}
        alt={alt}
        {...props}
      />
      
      {/* Loading Overlay / Skeleton Effect */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
    </div>
  );
}
