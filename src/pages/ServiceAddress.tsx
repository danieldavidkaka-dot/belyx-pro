import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Plus, Search, Home, Briefcase } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';

// --- INTERFACES & DATOS MOCK (Escalabilidad) ---
// Definimos la estructura de una dirección para que sea fácil conectar con una API luego.
interface SavedAddress {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  label: string;
  address: string;
}

const MOCK_ADDRESSES: SavedAddress[] = [
  { id: '1', type: 'Home', label: 'Home', address: '123 Main St, Apt 4B, New York, NY' },
  { id: '2', type: 'Work', label: 'Work', address: '456 Tech Blvd, Suite 200, Brooklyn, NY' },
];

interface ServiceAddressProps {
  onBack: () => void;
  onConfirm: (address: string) => void;
}

export default function ServiceAddress({ onBack, onConfirm }: ServiceAddressProps) {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener el icono según el tipo de lugar
  const getIcon = (type: string) => {
    switch (type) {
      case 'Home': return <Home size={20} className="text-slate-600" />;
      case 'Work': return <Briefcase size={20} className="text-slate-600" />;
      default: return <MapPin size={20} className="text-slate-600" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-28 font-sans relative">
      
      {/* 1. HEADER */}
      <div className="bg-white sticky top-0 z-20 px-4 py-4 flex items-center shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition">
          <ArrowLeft size={20} className="text-slate-900" />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-900 mr-8">Enter Service Address</h1>
      </div>

      <div className="px-6 pt-6">
        
        {/* 2. SEARCH INPUT (Con efecto Glow) */}
        <div className="relative mb-4 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative bg-white rounded-xl flex items-center p-1">
            <Search className="ml-3 text-purple-600" size={20} />
            <input 
              type="text" 
              placeholder="Search street, city, or zip code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent rounded-lg"
            />
          </div>
        </div>

        {/* 3. USE CURRENT LOCATION */}
        <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between mb-6 shadow-sm border border-slate-100 hover:bg-slate-50 transition active:scale-95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <Navigation size={20} className="text-purple-600 fill-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900 text-sm">Use current location</p>
              <p className="text-xs text-slate-400">Enable GPS for better accuracy</p>
            </div>
          </div>
          <div className="text-slate-300">›</div>
        </button>

        {/* 4. MAP PREVIEW (Simulado visualmente) */}
        <div className="relative w-full h-48 bg-slate-200 rounded-2xl overflow-hidden mb-2 shadow-inner border border-slate-200">
          {/* Imagen de fondo de mapa (placeholder) */}
          <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale"></div>
          
          {/* Badge "Service Available" */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm z-10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Service Available</span>
          </div>

          {/* Pin Central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <MapPin size={32} className="text-purple-600 fill-purple-600 drop-shadow-lg -mb-1" />
            <div className="bg-white px-2 py-1 rounded-md shadow-md text-[10px] font-bold text-slate-900 whitespace-nowrap">
              123 Fashion Ave
            </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 text-center mb-8 flex items-center justify-center gap-1">
          <span className="bg-slate-300 w-3 h-3 rounded-full flex items-center justify-center text-[8px] text-white font-bold">i</span>
          We currently service within 15 miles of downtown.
        </p>

        {/* 5. SAVED ADDRESSES (Lista Escalable) */}
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Saved Addresses</h3>
        
        <div className="space-y-3">
          {MOCK_ADDRESSES.map((addr) => (
            <div 
              key={addr.id}
              onClick={() => setSelectedId(addr.id)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                selectedId === addr.id 
                  ? 'bg-white border-purple-500 shadow-md shadow-purple-100' 
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Radio Button Visual */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                   selectedId === addr.id ? 'border-purple-600' : 'border-slate-300'
                }`}>
                  {selectedId === addr.id && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                </div>
                
                {/* Icono y Texto */}
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                  {getIcon(addr.type)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{addr.label}</p>
                  <p className="text-xs text-slate-400 truncate max-w-[180px]">{addr.address}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Botón Add New (Estilo Dashed) */}
          <button className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center gap-4 text-slate-500 hover:bg-slate-50 hover:border-purple-300 hover:text-purple-600 transition-colors">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="font-bold text-sm">Add a new address</span>
          </button>
        </div>

      </div>

      {/* 6. BOTTOM BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-20">
        <GradientButton 
          text="Confirm Location →" 
          fullWidth={true}
          onClick={() => onConfirm(selectedId)} 
        />
      </div>

    </div>
  );
}