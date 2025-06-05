import { type NextRequest, NextResponse } from "next/server";


const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get("location");

 
  if (!API_KEY) {
    return NextResponse.json(
      { error: "OpenWeather API key is not configured" },
      { status: 500 }
    );
  }


  if (!location) {
    return NextResponse.json(
      { error: "Location parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Determine if location is coordinates (lat,lng) or location name
    const isCoordinates = /^-?\d+\.?\d*,-?\d+\.?\d*$/.test(location.trim());

    let weatherQuery: string;
    let forecastQuery: string;

    if (isCoordinates) {
      const [lat, lon] = location.split(",");
      weatherQuery = `lat=${lat}&lon=${lon}`;
      forecastQuery = `lat=${lat}&lon=${lon}`;
    } else {
      weatherQuery = `q=${encodeURIComponent(location)}`;
      forecastQuery = `q=${encodeURIComponent(location)}`;
    }

    // Fetch current weather and 5-day forecast in parallel
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${BASE_URL}/weather?${weatherQuery}&appid=${API_KEY}&units=metric`
      ),
      fetch(
        `${BASE_URL}/forecast?${forecastQuery}&appid=${API_KEY}&units=metric`
      ),
    ]);

    // Check if both requests were successful
    if (!currentWeatherResponse.ok) {
      const errorData = await currentWeatherResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch current weather" },
        { status: currentWeatherResponse.status }
      );
    }

    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch weather forecast" },
        { status: forecastResponse.status }
      );
    }

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily forecasts (OpenWeather returns 3-hour intervals)
    const dailyForecasts = processForecastData(forecastData.list);

    // Format the response data
    const weatherData = {
      location: {
        name: currentWeatherData.name,
        country: currentWeatherData.sys.country,
      },
      current: {
        temperature: currentWeatherData.main.temp,
        description: currentWeatherData.weather[0].description,
        icon: currentWeatherData.weather[0].icon,
        humidity: currentWeatherData.main.humidity,
        windSpeed: currentWeatherData.wind.speed,
      },
      forecast: dailyForecasts,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching weather data" },
      { status: 500 }
    );
  }
}

// Helper function to process 5-day forecast data
function processForecastData(forecastList: any[]) {
  const dailyData: { [key: string]: any[] } = {};

  // Group forecast data by date
  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract date part (YYYY-MM-DD)
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  // Process each day to get min/max temperatures and most common weather condition
  const dailyForecasts = Object.entries(dailyData)
    .slice(0, 5) // Limit to 5 days
    .map(([date, dayData]) => {
      const temperatures = dayData.map((item) => item.main.temp);
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);

      // Get the most common weather condition for the day (from noon forecast if available)
      const noonForecast =
        dayData.find((item) => item.dt_txt.includes("12:00:00")) || dayData[0];

      return {
        date,
        temperature: {
          min: minTemp,
          max: maxTemp,
        },
        description: noonForecast.weather[0].description,
        icon: noonForecast.weather[0].icon,
      };
    });

  return dailyForecasts;
}
