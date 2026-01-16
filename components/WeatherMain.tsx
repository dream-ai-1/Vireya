"use client";
import AIBubble from './AIBubble';
import SunsetArc from './SunsetArc';
import { CalendarDays } from 'lucide-react';

// Props mein 'onOpenForecast' ko add kiya gaya hai
export default function WeatherMain({ weather, onOpenForecast }: any) {
  return (
    <div className="flex flex-col h-full relative text-white">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="pt-4">
          <p className="text-[12px] font-bold opacity-30 uppercase tracking-[0.6em] mb-2">Atmosphere</p>
          <h1 className="text-9xl font-extralight tracking-tighter leading-none">{weather}</h1>
          <p className="text-5xl font-medium opacity-20 italic uppercase">Status Update</p>
        </div>

        {/* Sunset Widget - Top Right */}
        <div className="w-80 bg-black/20 backdrop-blur-3xl rounded-[40px] border border-white/10 p-6 shadow-2xl">
           <SunsetArc />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 flex items-end justify-between pb-10">
        <div className="w-full flex justify-between items-end">
          
          {/* AI Assistant - Bottom Corner */}
          <div className="max-w-xs">
            <AIBubble weather={weather} />
          </div>

          {/* Naya 5-Day Forecast Button - Isme onClick add kiya hai */}
          <button 
            onClick={onOpenForecast} 
            className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full transition-all duration-300 active:scale-95 shadow-2xl"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Extended View</span>
              <span className="text-sm font-medium tracking-tight">5-Day Forecast</span>
            </div>
            <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
               <CalendarDays size={18} />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}