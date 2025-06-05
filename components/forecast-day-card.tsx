import { Badge } from "@/components/ui/badge";
import { WeatherIcon } from "./weather-icon";

interface ForecastDayCardProps {
  date: string;
  icon: string;
  description: string;
  temperature: {
    max: number;
    min: number;
  };
}

export function ForecastDayCard({
  date,
  icon,
  description,
  temperature,
}: ForecastDayCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="text-center p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="font-semibold text-sm text-gray-600 mb-2">
        {formattedDate}
      </div>
      <WeatherIcon icon={icon} size="medium" className="mx-auto mb-2" />
      <div className="text-xs text-gray-600 capitalize mb-2">{description}</div>
      <div className="flex justify-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {Math.round(temperature.max)}°
        </Badge>
        <Badge variant="outline" className="text-xs">
          {Math.round(temperature.min)}°
        </Badge>
      </div>
    </div>
  );
}
