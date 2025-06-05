"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MapPin, Info } from "lucide-react";
import { InfoModal } from "../components/info-modal";
import { CurrentWeatherCard } from "@/components/current-weather-card";
import { ForecastCard } from "@/components/forecast-card";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    description: string;
    icon: string;
  }>;
}

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Fetch weather data from our API route
  const fetchWeatherData = async (searchLocation: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(searchLocation)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeatherData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    fetchWeatherData(location.trim());
  };

  // Get user's current location using Geolocation API
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(`${latitude},${longitude}`);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied by user");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred while retrieving location");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Weather App
            </h1>
            <p className="text-gray-600">
              Get current weather and 5-day forecast for any location
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowInfoModal(true)}
            className="h-10 w-10"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Weather</CardTitle>
            <CardDescription>
              Enter a city name, zip/postal code, or GPS coordinates (lat,lng)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="text"
                placeholder="e.g., London, 10001, or 40.7128,-74.0060"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleUseMyLocation}
                disabled={loading}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Use My Location
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Weather Data Display */}
        {weatherData && (
          <div className="space-y-6">
            {/* Current Weather */}
            <CurrentWeatherCard
              location={weatherData.location}
              current={weatherData.current}
            />

            {/* 5-Day Forecast */}
            <ForecastCard forecast={weatherData.forecast} />
          </div>
        )}

        {/* Info Modal */}
        <InfoModal open={showInfoModal} onOpenChange={setShowInfoModal} />
      </div>
    </div>
  );
}
