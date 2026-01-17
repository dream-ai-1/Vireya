"use client";
import { Search, MapPin, Wind, Droplets, Thermometer, Eye } from 'lucide-react';

interface SidebarProps {
  weatherData: any;
}

export default function Sidebar({ weatherData }: SidebarProps) {
  // Safe extraction of data from API response
  const city = weatherData?.name || "Locating...";
  const country = weatherData?.sys?.country || "";
  const temp = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : "--";
  const description = weatherData?.weather?.[0]?.description || "Loading...";
  const humidity = weatherData?.main?.humidity || 0;
  const windSpeed = weatherData?.wind?.speed || 0;
  const visibility = weatherData?.visibility ? (weatherData.visibility / 1000).toFixed(1) : 0;

  return (
    <div className="p-10 flex flex-col h-full bg-black/40 backdrop-blur-3xl border-r border-white/10 text-white sidebar-container">
      {/* Search & Location */}
      <div className="flex justify-between items-center mb-10 opacity-60 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={14} className="flex-shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest truncate">
            {city} {country ? `, ${country}` : ""}
          </span>
        </div>
        <Search size={16} className="cursor-pointer hover:text-white transition-colors flex-shrink-0" />
      </div>

      {/* Main Temperature - Mobile: Responsive sizing */}
      <div className="mb-12">
        <h2 className="text-[110px] font-extralight leading-none tracking-tighter clamp-temperature">
          {temp}°
        </h2>
        <p className="text-lg opacity-40 font-medium ml-2 italic capitalize description-text">
          {description}
        </p>
      </div>

      {/* Real-time Stats List - Mobile: Responsive */}
      <div className="space-y-6 mt-4 weather-stats-grid">
        <div className="flex justify-between items-center border-b border-white/5 pb-4 group stat-item">
          <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity min-w-0">
            <Wind size={14} className="flex-shrink-0"/> 
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">Wind Flow</span>
          </div>
          <span className="text-sm font-medium flex-shrink-0 ml-2">{windSpeed} <small className="opacity-40">km/h</small></span>
        </div>

        <div className="flex justify-between items-center border-b border-white/5 pb-4 group stat-item">
          <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity min-w-0">
            <Droplets size={14} className="flex-shrink-0"/> 
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">Humidity</span>
          </div>
          <span className="text-sm font-medium flex-shrink-0 ml-2">{humidity}%</span>
        </div>

        <div className="flex justify-between items-center border-b border-white/5 pb-4 group stat-item">
          <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity min-w-0">
            <Eye size={14} className="flex-shrink-0"/> 
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">Visibility</span>
          </div>
          <span className="text-sm font-medium flex-shrink-0 ml-2">{visibility} <small className="opacity-40">km</small></span>
        </div>
        
        {/* Feel Like Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest gap-2">
            <span className="min-w-0">Thermal Comfort</span>
            <span className="flex-shrink-0">{Math.round(weatherData?.main?.feels_like || 0)}°</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-orange-400 transition-all duration-1000" 
              style={{ width: `${Math.min(Math.max((weatherData?.main?.feels_like || 0) * 2, 0), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Footer (Branding) */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 opacity-20">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-bold uppercase tracking-[0.3em]">System Synchronized</span>
        </div>
      </div>
    </div>
  );
}