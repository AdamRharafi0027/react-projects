import { useState } from "react";
import { search, clear, humidity, wind } from "./images";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");

  const searchFunc = async (city) => {
    if (!city) return alert("No City Name");

    try {
      const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const res = await fetch(Url);
      const data = await res.json();

      if (data.cod !== 200) {
        console.error("City not found");
        setWeatherData(null);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0]?.icon || clear,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearchCity = () => {
    searchFunc(cityName);
    setCityName("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-sm text-center text-white">
        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search city..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/40  w-30"
          />
          <img
            src={search}
            alt="search"
            onClick={handleSearchCity}
            className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        {weatherData ? (
          <>
            {/* Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="Weather icon"
              className="w-24 h-24 mx-auto mb-2"
            />
            <p className="text-5xl font-bold mb-1">{weatherData.temperature}°C</p>
            <p className="text-lg font-medium mb-6">{weatherData.location}</p>

            {/* Weather details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center bg-white/10 rounded-xl p-3">
                <img src={humidity} alt="Humidity" className="w-6 h-6 mb-1" />
                <p className="text-lg">{weatherData.humidity}%</p>
                <span className="text-sm opacity-80">Humidity</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 rounded-xl p-3">
                <img src={wind} alt="Wind Speed" className="w-6 h-6 mb-1" />
                <p className="text-lg">{weatherData.windSpeed} Km/h</p>
                <span className="text-sm opacity-80">Wind Speed</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-white/80">Enter a city to see the weather</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
