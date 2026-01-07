import React, { useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, Map, Search } from 'lucide-react';
import { ProfessionalCard, Professional } from '../components/ProfessionalCard';

// MOCK DATA (Esto vendrá de tu Base de Datos en el futuro)
const MOCK_PROS: Professional[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Master Colorist',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    locationType: 'both',
    nextAvailable: 'Today, 4:00 PM',
    isTopRated: true,
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Senior Therapist',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    locationType: 'salon',
    nextAvailable: 'Tomorrow, 10:00 AM',
    isTopRated: false,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Holistic Specialist',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    locationType: 'home',
    nextAvailable: 'Today, 5:30 PM',
    isTopRated: false,
  },
];

interface SelectProfessionalProps {
  onBack: () => void;
  onSelect: (proId: string) => void;
}

export default function SelectProfessional({ onBack, onSelect }: SelectProfessionalProps) {
  // 1. ESTADOS PARA LOS FILTROS
  const [activeFilter, setActiveFilter] = useState('All Pros');
  const [searchTerm, setSearchTerm] = useState('');

  // 2. LÓGICA DE FILTRADO (useMemo hace que sea muy rápido y escalable)
  const filteredPros = useMemo(() => {
    return MOCK_PROS.filter((pro) => {
      // Filtro 1: Búsqueda por texto (Nombre o Rol)
      const matchesSearch = 
        pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pro.role.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro 2: Botones de Categoría
      let matchesCategory = true;
      if (activeFilter === 'Top Rated') matchesCategory = pro.rating >= 4.8;
      if (activeFilter === 'Available Today') matchesCategory = pro.nextAvailable.includes('Today');
      // Puedes agregar lógica para 'Favorites' más adelante

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeFilter]); // Solo recalcula si cambian estos datos

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans relative">
      
      {/* HEADER */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition">
            <ArrowLeft size={20} className="text-slate-900" />
          </button>
          <h1 className="font-bold text-slate-900">Select Professional</h1>
          <button className="p-2 -mr-2 hover:bg-slate-50 rounded-full transition">
            <SlidersHorizontal size={20} className="text-slate-900" />
          </button>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-y border-slate-100 flex justify-between items-center">
            <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Booking For</p>
                <p className="text-sm font-bold text-slate-900">Deep Tissue Massage</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-purple-600">$120 • 60m</p>
            </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="px-6 py-6">
        {/* Search Input Conectado */}
        <div className="relative mb-6">
            <input 
                type="text" 
                placeholder="Search professional by name" 
                value={searchTerm} // <--- Conectado al estado
                onChange={(e) => setSearchTerm(e.target.value)} // <--- Actualiza al escribir
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
        </div>

        {/* Filters Conectados */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {['All Pros', 'Available Today', 'Top Rated', 'Favorites'].map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        activeFilter === filter 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
      </div>

      {/* LIST OF PROS (Ahora usamos filteredPros en lugar de MOCK_PROS) */}
      <div className="px-6 space-y-2">
        <h3 className="font-bold text-slate-900 mb-4">
            {filteredPros.length} Professional{filteredPros.length !== 1 ? 's' : ''} found
        </h3>
        
        {filteredPros.length > 0 ? (
          filteredPros.map((pro) => (
            <ProfessionalCard 
              key={pro.id}
              {...pro}
              onSelect={() => onSelect(pro.id)}
            />
          ))
        ) : (
            // Estado vacío si no hay resultados
            <div className="text-center py-10 text-slate-400">
                <p>No professionals found.</p>
                <button 
                    onClick={() => {setActiveFilter('All Pros'); setSearchTerm('')}}
                    className="text-purple-600 text-sm font-bold mt-2"
                >
                    Clear Filters
                </button>
            </div>
        )}

        {/* Loader Decorativo */}
        <div className="h-24 w-full bg-white rounded-2xl animate-pulse mt-4 opacity-30"></div>
      </div>

      {/* FLOATING MAP */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-30">
        <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full shadow-xl shadow-slate-400/20 hover:scale-105 transition-transform font-bold text-sm">
            <Map size={16} />
            Map View
        </button>
      </div>

    </div>
  );
}