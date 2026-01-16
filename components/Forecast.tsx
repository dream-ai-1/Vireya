"use client";

interface ForecastProps {
  hourly: any[]; // Yeh line baki thi
}

export default function Forecast({ hourly }: ForecastProps) {
  return (
    <div className="grid grid-cols-7 gap-4">
      {hourly?.map((item: any, i: number) => (
        <div key={i} className="flex flex-col items-center gap-2 group">
          {/* Time: API se convert kiya gaya */}
          <span className="text-[10px] opacity-40 uppercase font-bold text-white group-hover:opacity-100 transition-opacity">
            {new Date(item.dt * 1000).getHours()}:00
          </span>
          
          {/* Temperature Bar Graph */}
          <div className="h-16 w-[2px] bg-white/5 relative overflow-hidden rounded-full">
            <div 
              className="absolute bottom-0 left-0 w-full bg-white/40 transition-all duration-1000 ease-out group-hover:bg-white"
              style={{ height: `${(item.main.temp / 45) * 100}%` }} // Adjusted for 45 deg max
            />
          </div>
          
          {/* Temperature Text */}
          <span className="text-sm font-light text-white">{Math.round(item.main.temp)}°</span>
        </div>
      ))}
    </div>
  );
}