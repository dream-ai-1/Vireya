"use client";
import { Moon } from 'lucide-react';

export default function SunsetArc() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Solar Cycle</span>
        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
          <Moon size={10} className="text-blue-300" />
          <span className="text-[8px] uppercase font-bold tracking-tighter">Gibbous</span>
        </div>
      </div>
      
      <div className="relative w-full h-20">
        <svg viewBox="0 0 200 80" className="w-full h-full">
          <path d="M 10,70 A 90,90 0 0,1 190,70" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4,4" className="opacity-20" />
          <circle cx="160" cy="30" r="3" fill="#fbbf24" className="animate-pulse" />
        </svg>
        <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-medium opacity-60">
          <span>06:12</span>
          <span>17:48</span>
        </div>
      </div>
    </div>
  );
}