import React from 'react';

export const ProMapCard = () => {
  return (
    <div className="w-full h-48 bg-slate-200 rounded-[32px] relative overflow-hidden group cursor-pointer">
       {/* Fondo Simulado de Mapa */}
       <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
       
       {/* Avatares Flotantes (Simulados) */}
       <div className="absolute top-10 left-1/3 p-1 bg-white rounded-full shadow-md z-10">
         <img src="https://i.pravatar.cc/150?img=32" className="w-8 h-8 rounded-full" />
       </div>
       <div className="absolute top-16 right-1/4 p-1 bg-white rounded-full shadow-md z-10">
         <img src="https://i.pravatar.cc/150?img=44" className="w-8 h-8 rounded-full" />
       </div>

       {/* Tarjeta Flotante Inferior */}
       <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-2xl shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                📍
             </div>
             <div>
                <p className="font-bold text-slate-900 text-sm">3 Pros Available</p>
                <p className="text-[10px] text-slate-400">Within 2km radius</p>
             </div>
          </div>
          <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
             ➔
          </div>
       </div>
    </div>
  );
};