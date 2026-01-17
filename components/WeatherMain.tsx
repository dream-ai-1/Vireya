"use client";
import AIBubble from './AIBubble';
import SunsetArc from './SunsetArc';
import { CalendarDays } from 'lucide-react';

// Props mein 'onOpenForecast' ko add kiya gaya hai
export default function WeatherMain({ weather, onOpenForecast }: any) {
  return (
    <div className="flex flex-col h-full relative text-white gap-4">
      {/* Top Section - Mobile: Stack vertically, responsive sizing */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
        <div className="pt-4">
          <p className="text-[12px] font-bold opacity-30 uppercase tracking-[0.6em] mb-2">Atmosphere</p>
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-extralight tracking-tighter leading-none weather-heading-main">{weather}</h1>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-medium opacity-20 italic uppercase description-text">Status Update</p>
        </div>

        {/* Sunset Widget - Mobile: Full width, Desktop: Fixed width */}
        <div className="w-full lg:w-80 bg-black/20 backdrop-blur-3xl rounded-[40px] border border-white/10 p-6 shadow-2xl sunset-widget">
           <SunsetArc />
        </div>
      </div>

      {/* Bottom Section - Mobile: Stack vertically */}
      <div className="flex-1 flex items-end justify-between pb-10 pt-6 lg:pt-0 flex-col lg:flex-row gap-4 lg:gap-0">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
          
          {/* AI Assistant - Bottom Corner - Mobile: Full width */}
          <div className="w-full lg:max-w-xs">
            <AIBubble weather={weather} />
          </div>

          {/* 5-Day Forecast Button - Mobile: Responsive sizing */}
          <button 
            onClick={onOpenForecast} 
            className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 active:scale-95 shadow-2xl w-full lg:w-auto justify-center lg:justify-start forecast-button"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Extended View</span>
              <span className="text-sm font-medium tracking-tight">5-Day Forecast</span>
            </div>
            <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
               <CalendarDays size={18} />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}