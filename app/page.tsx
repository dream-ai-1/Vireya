"use client";

import { useState, useEffect } from 'react';
import LiveClock from '@/components/LiveClock';
import Sidebar from '@/components/Sidebar';
import WeatherMain from '@/components/WeatherMain';
import Forecast from '@/components/Forecast';
import ForecastDrawer from '@/components/ForecastDrawer';

export default function WeatherApp() {
  const [mounted, setMounted] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // OpenWeatherMap API Key
  const API_KEY = "21cd57b55bc6a2023125ef73dd3c9462"; 

  useEffect(() => {
    setMounted(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => fetchWeather(28.6139, 77.2090) // Default: Delhi
      );
    }
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      ]);

      const current = await currentRes.json();
      const forecast = await forecastRes.json();

      setWeatherData(current);
      setForecastData(forecast);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (loading || !weatherData) {
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="text-white/20 tracking-[1em] uppercase text-[10px] animate-pulse font-bold">
          Syncing Atmosphere...
        </div>
      </div>
    );
  }

  // Weather Mood Logic for Background
  const mood = weatherData?.weather?.[0]?.main || 'Clear';

 const bgImages: { [key: string]: string } = {
    Clear: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1920&auto=format&fit=crop',
    Rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920&auto=format&fit=crop',
    Drizzle: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=1920&auto=format&fit=crop',
    Thunderstorm: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=1920&auto=format&fit=crop',
    Snow: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1920&auto=format&fit=crop',
    Clouds: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1920&auto=format&fit=crop',
    Mist: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=1920&auto=format&fit=crop',
    Fog: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1920&auto=format&fit=crop',
    Haze: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920',
  };

  return (
    <main className="relative h-screen w-full overflow-hidden flex transition-all duration-1000 weather-app-main" suppressHydrationWarning>
      
      {/* Live Clock - Top Right Corner */}
      <LiveClock />

      {/* 1. Dynamic Background Image */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out scale-105"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${bgImages[mood] || bgImages.Clear})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.1)'
        }}
      />

      {/* 2. Glassmorphism Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/10 backdrop-blur-[1px] pointer-events-none" />

      {/* 3. Forecast Drawer (Side Panel) - Mobile: Full width */}
      <ForecastDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        forecastList={forecastData?.list || []} 
      />

      {/* 4. Left Sidebar - Mobile: Top section, stacked */}
      <aside className="w-[400px] h-full z-20 relative weather-sidebar-container">
        <Sidebar weatherData={weatherData} />
      </aside>

      {/* 5. Main Center/Right Content - Mobile: Full width, stacked */}
      <section className="flex-1 flex flex-col p-14 z-10 relative weather-main-content">
        <div className="flex-1">
          <WeatherMain 
            weather={mood} 
            temp={Math.round(weatherData.main.temp)}
            city={weatherData.name}
            onOpenForecast={() => setDrawerOpen(true)} 
          />
        </div>

        {/* Bottom Hourly Flow Graph - Mobile: Responsive grid */}
        <div className="mt-auto pt-10 border-t border-white/10 backdrop-blur-md rounded-[30px] p-8 bg-white/5 transition-all duration-500 hover:bg-white/10 forecast-section">
          <div className="flex justify-between items-center mb-8">
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.5em] text-white">
              7-Hour Atmospheric Flow
            </p>
            <div className="flex gap-1">
              <div className="h-1 w-1 rounded-full bg-white/40 animate-pulse" />
              <div className="h-1 w-1 rounded-full bg-white/20 animate-pulse delay-75" />
            </div>
          </div>
          
          {forecastData?.list ? (
             <Forecast hourly={forecastData.list.slice(0, 7)} />
          ) : (
             <div className="h-24 flex items-center justify-center text-[10px] opacity-20 tracking-widest uppercase">
               Analyzing Pulse...
             </div>
          )}
        </div>
      </section>
    </main>
  );
}