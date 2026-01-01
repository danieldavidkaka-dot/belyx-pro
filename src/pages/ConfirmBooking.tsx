import React from 'react';
import { InfoRow } from '../components/InfoRow';

interface ConfirmBookingProps {
  onBack: () => void;
  onConfirm: () => void;
}

export const ConfirmBooking = ({ onBack, onConfirm }: ConfirmBookingProps) => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-32 font-sans">
      
      {/* HEADER */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-slate-800 hover:bg-slate-50 rounded-full">
            ←
        </button>
        <h1 className="text-lg font-bold text-slate-900">Confirmar Reserva</h1>
      </div>

      <div className="px-6 pt-6">
        
        {/* 1. TARJETA DE SERVICIO */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 mb-4">
            <div className="flex-1">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Service</span>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Luxury Gel Manicure</h2>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <span>🕒</span> 45 mins
                </div>
            </div>
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200">
                <img src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Service" />
            </div>
        </div>

        {/* 2. PROFESIONAL */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 mb-6">
            <div className="relative">
                <img src="https://i.pravatar.cc/150?img=32" className="w-12 h-12 rounded-full border-2 border-slate-100" alt="Pro" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-sm">Sarah Jenkins</h3>
                <p className="text-xs text-slate-400">Top Stylist • 4.9 ★</p>
            </div>
            <button className="text-xs font-bold text-purple-600">View Profile</button>
        </div>

        {/* 3. DETALLES DE RESERVA (Usando nuestro componente InfoRow) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Booking Details</h3>
            
            <InfoRow 
                icon={<span>📅</span>}
                label="Date"
                value="Fri, Oct 20"
                onEdit={() => {}}
            />
            
            <InfoRow 
                icon={<span>🕒</span>}
                label="Time"
                value="10:00 AM"
                onEdit={() => {}}
            />

            <InfoRow 
                icon={<span>📍</span>}
                label="Location • At Home"
                value="Av. Libertador 1234, 5B, Buenos Aires"
                onEdit={() => {}}
            >
                {/* Mapa miniatura insertado como children */}
                <div className="mt-2 h-16 w-full rounded-lg overflow-hidden relative bg-slate-200">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl drop-shadow-md">📍</span>
                    </div>
                </div>
            </InfoRow>
        </div>

        {/* 4. MÉTODO DE PAGO */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Payment Method</h3>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-black rounded flex items-center justify-center text-white text-[8px] font-bold">Apple Pay</div>
                    <div className="text-sm">
                        <p className="font-bold text-slate-900">Apple Pay</p>
                        <p className="text-xs text-slate-400">Mastercard ending in 1234</p>
                    </div>
                </div>
                <span className="text-slate-400">▼</span>
            </div>
        </div>

        {/* 5. DESGLOSE DE PRECIOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Service Cost</span>
                <span>$45.00</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Transport Fee</span>
                <span>$5.00</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 mb-4 pb-4 border-b border-slate-50">
                <span>Taxes & Fees</span>
                <span>$2.50</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-xl font-black text-[#8B31FF]">$52.50</span>
            </div>
        </div>

        <p className="text-[10px] text-slate-400 text-center px-4 leading-relaxed">
            Free cancellation until 24h before the appointment. <br/>
            By confirming, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
        </p>

      </div>

      {/* FOOTER FIJO */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 z-50">
        <button 
            onClick={onConfirm}
            className="w-full bg-white border-2 border-[#8B31FF] text-[#8B31FF] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#8B31FF] hover:text-white transition-all group"
        >
            Confirm Booking 
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
        </button>
      </div>

    </div>
  );
};