"use client";
import { X } from 'lucide-react';

// Yeh interface batata hai ki ForecastDrawer kya-kya data accept karega
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  forecastList: any[]; // <--- Yeh line error fix karegi
}

export default function ForecastDrawer({ isOpen, onClose, forecastList }: DrawerProps) {
  // API se har din ka 1 data point nikalne ke liye filter
  const dailyData = forecastList?.filter((_: any, index: number) => index % 8 === 0) || [];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[40]" onClick={onClose} />}
      <div className={`fixed top-0 left-0 h-screen w-full md:w-[400px] bg-black/90 backdrop-blur-2xl z-[50] border-r border-white/10 transition-transform duration-500 p-6 md:p-10 forecast-drawer-mobile ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10 gap-3">
          <h2 className="text-xl md:text-2xl font-light text-white">5-Day Forecast</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition"><X size={20} /></button>
        </div>

        <div className="space-y-4 overflow-y-auto h-[calc(100vh-150px)] pr-2">
          {dailyData.map((day: any, i: number) => (
            <div key={i} className="bg-white/5 p-4 md:p-5 rounded-2xl border border-white/5 hover:border-white/10 transition">
              <p className="text-sm opacity-50 mb-1">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <div className="flex justify-between items-center gap-2">
                <span className="text-lg md:text-xl font-medium text-white">{Math.round(day.main.temp)}°</span>
                <span className="text-xs opacity-70 text-white capitalize text-right">{day.weather[0].description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}