import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { Wind, Waves } from "lucide-react";

interface WeatherInfo {
  main: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

const LOCATIONS: Array<string> = [
  "Quezon City",
  "Puerto Princesa",
  "Cebu City",
  "Carmona",
  "Antipolo",
  "Iloilo",
  "Butuan",
  "Cotabato City",
  "Davao City",
  "Tagum City",
];

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    if (!selectedLocation) {
      return;
    }

    fetch(`api/weather?address=${selectedLocation}`)
      .then((res) => res.json())
      .then((data) => setWeatherInfo(data));
  }, [selectedLocation]);

  const displayWeatherInfo = () => {
    if (weatherInfo === null) {
      return (
        <p className="font-semibold text-2xl text-secondary">
          Please select a location
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-y-2 gap-x-2 font-medium text-white">
        <div className="col-span-2">
          <p className="font-semibold text-xl text-center">
            {selectedLocation}
          </p>
          <p className="font-bold text-5xl text-center">
            {weatherInfo.temperature}&deg;C
          </p>
        </div>

        <div>{weatherInfo.main}</div>
        <div>{weatherInfo.description}</div>
        <div className="flex items-center gap-2">
          <Waves />
          <div>
            <p>{weatherInfo.humidity}%</p>
            <p className="text-sm">Humidity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind />
          <div>
            <p>{weatherInfo.windSpeed} km/h</p>
            <p className="text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center py-8 gap-10 bg-gradient-to-b from-blue-500 to-cyan-500">
      <div className="min-h-24">{displayWeatherInfo()}</div>

      <div className="flex justify-cente min-w-80 py-5 border rounded-xl bg-white shadow-lg max-h-72">
        <ScrollArea className="px-4 w-full">
          {LOCATIONS.map((location: string, index: number) => (
            <div className="flex justify-between my-1" key={index}>
              <p className="font-medium">{location}</p>
              <Button
                className="bg-zinc-700"
                key={index}
                onClick={() => setSelectedLocation(location)}
              >
                View
              </Button>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

export default App;
