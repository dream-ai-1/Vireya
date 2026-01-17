"use client";

interface ForecastProps {
  hourly: any[]; // Yeh line baki thi
}

export default function Forecast({ hourly }: ForecastProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 forecast-grid-mobile">
      {hourly?.map((item: any, i: number) => (
        <div key={i} className="flex flex-col items-center gap-2 group">
          {/* Time: API se convert kiya gaya */}
          <span className="text-[10px] opacity-40 uppercase font-bold text-white group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {new Date(item.dt * 1000).getHours()}:00
          </span>
          
          {/* Temperature Bar Graph - Mobile: Responsive height */}
          <div className="h-16 sm:h-20 w-[2px] bg-white/5 relative overflow-hidden rounded-full">
            <div 
              className="absolute bottom-0 left-0 w-full bg-white/40 transition-all duration-1000 ease-out group-hover:bg-white"
              style={{ height: `${(item.main.temp / 45) * 100}%` }}
            />
          </div>
          
          {/* Temperature Text - Mobile: Responsive sizing */}
          <span className="text-xs sm:text-sm font-light text-white whitespace-nowrap">{Math.round(item.main.temp)}°</span>
        </div>
      ))}
    </div>
  );
}