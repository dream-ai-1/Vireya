import { X, CloudRain, Sun, CloudLightning, Wind } from 'lucide-react';

export default function FullReport({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const days = [
    { day: 'Tomorrow', temp: '22°/14°', icon: <CloudRain className="text-blue-400"/>, status: 'Showers' },
    { day: 'Sunday', temp: '24°/16°', icon: <Sun className="text-yellow-400"/>, status: 'Sunny' },
    { day: 'Monday', temp: '20°/12°', icon: <CloudLightning className="text-purple-400"/>, status: 'Storm' },
    { day: 'Tuesday', temp: '19°/11°', icon: <Wind className="text-teal-400"/>, status: 'Windy' },
    // ... add more days for 10 days
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[40px] p-8 shadow-2xl overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-light tracking-tight">10-Day <span className="font-bold">Forecast</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {days.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition">
              <span className="text-sm font-medium w-20">{d.day}</span>
              <div className="flex items-center gap-3">
                {d.icon}
                <span className="text-xs text-white/40">{d.status}</span>
              </div>
              <span className="text-sm font-bold tracking-tighter">{d.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}