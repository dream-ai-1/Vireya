"use client";

import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      
      // Format time: HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}:${seconds}`;
      
      // Format date: MON • 17 JAN 2026
      const dayName = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const year = now.getFullYear();
      const dateStr = `${dayName} • ${day} ${month} ${year}`;
      
      setTime(timeStr);
      setDate(dateStr);
    };

    // Initial update
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 right-0 z-30 p-4 sm:p-6 md:p-8 pointer-events-none live-clock-container">
      <div className="flex flex-col items-end gap-1 live-clock">
        <div className="text-xs sm:text-sm md:text-base font-mono font-bold text-white/70 tracking-[0.15em] live-clock-date">
          {date}
        </div>
        <div className="text-lg sm:text-2xl md:text-3xl font-mono font-light text-white tracking-[0.08em] live-clock-time">
          {time}
        </div>
      </div>
    </div>
  );
}
