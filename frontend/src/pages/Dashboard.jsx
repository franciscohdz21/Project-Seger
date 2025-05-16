import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function Dashboard() {
  const [coords, setCoords] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords({ lat, lon });

        try {
          const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
            params: {
              lat,
              lon,
              exclude: 'minutely,hourly,alerts',
              units: 'metric',
              appid: API_KEY
            }
          });
          setForecast(data.daily.slice(0, 7));

          const locationRes = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse`, {
            params: {
              lat,
              lon,
              limit: 1,
              appid: API_KEY
            }
          });
          if (locationRes.data.length > 0) {
            setLocationName(locationRes.data[0].name);
          }

        } catch (error) {
          console.error("Weather fetch error:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
      }
    );
  }, []);

  const getDay = (timestamp) =>
    new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Weather Section */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4">7-Day Forecast {locationName && `for ${locationName}`}</h3>
        {loading ? (
          <p>Loading weather...</p>
        ) : forecast.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {forecast.map((day, i) => (
              <div key={i} className="text-center p-3 bg-blue-50 rounded shadow hover:bg-blue-100 transition">
                <p className="font-medium">{getDay(day.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="mx-auto"
                />
                <p className="text-sm capitalize">{day.weather[0].description}</p>
                <p className="text-sm">🌡 {Math.round(day.temp.min)}° / {Math.round(day.temp.max)}°C</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Could not retrieve weather data.</p>
        )}
      </div>

      {/* News Section */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Latest News</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>Project Seger v1.0 launched 🎉</li>
          <li>Appointments now support 2-cabin calendar</li>
          <li>Next: Settings and multilingual support</li>
        </ul>
      </div>
    </div>
  );
}
