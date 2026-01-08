import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, SlidersHorizontal, Search, Plus, 
  ChevronRight, User 
} from 'lucide-react';
import { StaffBottomNav } from '../components/StaffBottomNav';

// Datos Centralizados
import { STAFF_CLIENTS } from '../data/mocks';

export default function StaffClients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de Navegación (ACTUALIZADA)
  const handleBottomNav = (tab: 'agenda' | 'clients' | 'earnings' | 'profile') => {
    if (tab === 'agenda') navigate('/staff-dashboard');
    if (tab === 'earnings') navigate('/staff-earnings');
    if (tab === 'clients') return; // Ya estamos aquí
    if (tab === 'profile') navigate('/staff-profile'); // <--- ¡CONECTADO!
  };

  // Filtrado y Agrupación de Clientes
  const filteredClients = STAFF_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  // Agrupar por letra inicial (A, B, C...)
  const groupedClients = filteredClients.reduce((groups, client) => {
    const letter = client.name[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(client);
    return groups;
  }, {} as Record<string, typeof STAFF_CLIENTS>);

  const sortedLetters = Object.keys(groupedClients).sort();

  return (
    <div className="bg-white min-h-screen pb-24 font-sans text-slate-900 relative">
      
      {/* 1. HEADER */}
      <div className="px-6 pt-6 pb-2 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
        <div className="flex items-center justify-between mb-6">
           <button className="p-2 -ml-2 text-slate-900">
              <Menu size={24} />
           </button>
           <h1 className="text-xl font-bold">Clientes</h1>
           <button className="p-2 -mr-2 text-slate-900">
              <SlidersHorizontal size={22} />
           </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
              type="text" 
              placeholder="Buscar por nombre, teléfono..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium outline-none focus:border-purple-200 transition-colors"
           />
        </div>
      </div>

      {/* 2. CLIENT LIST */}
      <div className="px-6 relative">
         
         {/* Alphabet Index (Derecha) */}
         <div className="fixed right-2 top-32 bottom-24 flex flex-col justify-center gap-1 z-10">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
               <span key={letter} className="text-[9px] font-bold text-slate-300 text-center w-4">
                  {letter}
               </span>
            ))}
         </div>

         {/* Lista Agrupada */}
         <div className="space-y-6">
            {sortedLetters.map(letter => (
               <div key={letter}>
                  {/* Header de Letra (A, C, L...) */}
                  <h3 className="text-xs font-bold text-slate-400 mb-3 mt-4">{letter}</h3>
                  
                  <div className="space-y-4">
                     {groupedClients[letter].map(client => (
                        <div key={client.id} className="flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-transform">
                           <div className="flex items-center gap-4">
                              {/* Avatar */}
                              <div className="relative">
                                 {client.image ? (
                                    <img 
                                       src={client.image} 
                                       alt={client.name} 
                                       className={`w-14 h-14 rounded-full object-cover border-2 ${client.isVIP ? 'border-purple-200 p-[2px]' : 'border-slate-100'}`} 
                                    />
                                 ) : (
                                    <div className="w-14 h-14 rounded-full bg-purple-50 border-2 border-slate-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                                       {client.initials || <User size={20} />}
                                    </div>
                                 )}
                                 
                                 {/* Indicador Online/VIP si se desea */}
                                 {client.isVIP && (
                                     <div className="absolute -top-1 -right-1 bg-purple-100 text-purple-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                                        VIP
                                     </div>
                                 )}
                              </div>

                              {/* Info */}
                              <div>
                                 <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-900 text-base">{client.name}</h4>
                                    {client.tag && (
                                       <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                          {client.tag}
                                       </span>
                                    )}
                                 </div>
                                 <p className="text-sm text-slate-500 font-medium">{client.serviceInfo}</p>
                              </div>
                           </div>

                           {/* Arrow */}
                           <button className="text-slate-300 group-hover:text-purple-500 transition-colors">
                              <ChevronRight size={20} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            ))}

            {sortedLetters.length === 0 && (
               <div className="text-center py-20 text-slate-400">
                  <p>No se encontraron clientes.</p>
               </div>
            )}
         </div>
      </div>

      {/* 3. FAB (Botón Flotante) */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all z-30">
          <Plus size={28} />
      </button>

      {/* FOOTER NAV */}
      <StaffBottomNav activeTab="clients" onNavigate={handleBottomNav} />

    </div>
  );
}