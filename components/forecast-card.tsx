import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { ForecastDayCard } from "./forecast-day-card";

interface ForecastCardProps {
  forecast: {
    date: string;
    icon: string;
    description: string;
    temperature: {
      max: number;
      min: number;
    };
  }[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <ForecastDayCard key={index} {...day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
