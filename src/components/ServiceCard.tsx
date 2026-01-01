import React from 'react';

interface ServiceCardProps {
  title: string;
  salonName: string;
  price: string;
  image: string;
  matchScore: number;
}

export const ServiceCard = ({ title, salonName, price, image, matchScore }: ServiceCardProps) => {
  return (
    <div className="min-w-[260px] bg-white rounded-2xl p-3 shadow-sm border border-slate-100 snap-center">
      <div className="relative h-32 rounded-xl overflow-hidden mb-3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="text-purple-600 text-[10px]">⚡</span>
          <span className="text-[10px] font-bold text-purple-700">{matchScore}% Match</span>
        </div>
      </div>
      
      <h3 className="font-bold text-slate-800 text-sm mb-0.5">{title}</h3>
      <p className="text-xs text-slate-400 mb-3">{salonName}</p>
      
      <div className="flex justify-between items-center">
        <span className="font-bold text-slate-900">${price}</span>
        <button className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};