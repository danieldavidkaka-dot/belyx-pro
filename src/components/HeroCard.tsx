import React from 'react';

interface HeroCardProps {
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  time: string;
  image: string;
}

export const HeroCard = ({ title, subtitle, rating, reviews, time, image }: HeroCardProps) => {
  return (
    <div className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100 mb-8">
      {/* Imagen Header */}
      <div className="relative h-48 rounded-[24px] overflow-hidden mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Best Match</span>
        </div>
      </div>

      {/* Info */}
      <div className="px-2">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors">
                ♥
            </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-4">{subtitle}</p>
        
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
            <div className="flex items-center gap-1">
                <span>🕒</span>
                <span className="font-bold">{time}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-bold">{rating}</span>
                <span className="text-slate-400">({reviews})</span>
            </div>
        </div>

        <button className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Book Again 
            <span>➔</span>
        </button>
      </div>
    </div>
  );
};