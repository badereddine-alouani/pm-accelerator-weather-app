import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Droplets, Wind } from "lucide-react";
import { WeatherIcon } from "./weather-icon";

interface CurrentWeatherCardProps {
  location: { name: string; country: string };
  current: {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
}

export function CurrentWeatherCard({
  location,
  current,
}: CurrentWeatherCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {location.name}, {location.country}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <WeatherIcon icon={current.icon} size="large" />
            <div>
              <div className="text-4xl font-bold text-gray-900">
                {Math.round(current.temperature)}°C
              </div>
              <div className="text-lg text-gray-600 capitalize">
                {current.description}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{current.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="font-semibold">{current.windSpeed} m/s</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
