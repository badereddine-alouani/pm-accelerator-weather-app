import Image from "next/image";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  icon: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function WeatherIcon({
  icon,
  size = "medium",
  className,
}: WeatherIconProps) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather icon"
      width={size === "large" ? 64 : size === "medium" ? 48 : 32}
      height={size === "large" ? 64 : size === "medium" ? 48 : 32}
      className={cn(sizeClasses[size], className)}
      crossOrigin="anonymous"
    />
  );
}
