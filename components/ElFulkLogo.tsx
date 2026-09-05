import React from "react";
import Image from "next/image";

interface ElFulkLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function ElFulkLogo({ className = "", size = "md" }: ElFulkLogoProps) {
  const sizeMap = {
    sm: { width: 96, height: 68 },
    md: { width: 140, height: 98 },
    lg: { width: 180, height: 126 },
    xl: { width: 220, height: 154 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div
      className={`relative inline-block transition-transform select-none hover:scale-105 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="شعار الفلك ElFulk"
        width={width}
        height={height}
        priority
        className="h-auto w-auto object-contain drop-shadow-sm"
      />
    </div>
  );
}
