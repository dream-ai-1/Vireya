"use client";
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function AIBubble({ weather }: { weather: string }) {
  const [text, setText] = useState("");
  
  const suggestions: Record<string, string> = {
    Storm: "Heavy thunder expected. AI suggests wearing a waterproof parka and high-grip boots. Stay indoors if possible.",
    Clear: "Bright and sunny! A light cotton t-shirt and sunglasses are perfect. UV levels are rising.",
    Rain: "Consistent drizzle. A lightweight hoodie and an umbrella will be your best friends today.",
    Snow: "It's freezing! Layer up with a thermal inner and a heavy wool coat. Keep your gloves handy.",
    Fog: "Low visibility. Wear bright colors so you're visible, and a light windbreaker should be enough."
  };

  useEffect(() => {
    let fullText = suggestions[weather] || suggestions.Clear;
    let i = 0;
    setText(""); // Reset text on weather change
    
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30); // Speed of typing

    return () => clearInterval(interval);
  }, [weather]);

  return (
    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-white/10 p-4 md:p-5 rounded-[2rem] flex gap-4 transition-all duration-500 hover:border-white/20 ai-bubble">
      <div className="bg-white/10 p-3 rounded-2xl h-fit animate-bounce flex-shrink-0">
        <Sparkles className="h-5 w-5 text-blue-300" />
      </div>
      <div className="min-w-0">
        <h4 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">AI Assistant</h4>
        <p className="text-xs md:text-sm text-white/80 leading-relaxed min-h-[40px] break-words">
          {text}<span className="animate-pulse">|</span>
        </p>
      </div>
    </div>
  );
}