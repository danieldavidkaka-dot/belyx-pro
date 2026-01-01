import React from 'react';
import { GradientButton } from '../components/GradientButton';

export const Welcome = () => {
  return (
    <div className="h-[100dvh] w-full bg-white flex flex-col items-center px-6 py-6 font-sans overflow-hidden supports-[height:100cqh]:h-[100cqh]">
      
      {/* SECCIÓN SUPERIOR */}
      <div className="flex flex-col items-center shrink-0">
        
        {/* 1. LOGO CON MÁS ZOOM (Aumentado a w-60) */}
        <div className="mb-2"> 
            <img 
                src="https://iili.io/fXbZvWu.md.png" 
                alt="BELYX Logo" 
                className="w-60 h-auto object-contain" 
            />
        </div>

        {/* 2. TEXTO LIMPIO (Frase anterior eliminada) */}
        <p className="text-slate-500 text-center mb-6 text-sm leading-relaxed max-w-[280px]">
            Vive la experiencia en el salón o la comodidad de tu hogar.
        </p>
      </div>

      {/* SECCIÓN CENTRAL: Imagen Flexible */}
      <div className="flex-1 w-full max-w-md relative rounded-[32px] overflow-hidden shadow-xl shadow-slate-200 mb-6 min-h-0">
        
        {/* Etiqueta Flotante */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Hybrid Service</span>
        </div>

        {/* Imagen de Fondo */}
        <img 
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1000&auto=format&fit=crop" 
            alt="Luxury Salon" 
            className="w-full h-full object-cover"
        />
        
        {/* Gradiente */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* SECCIÓN INFERIOR: Botón */}
      <div className="w-full max-w-md shrink-0">
        <GradientButton 
            text="Comenzar" 
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            }
        />
        
        <div className="mt-4 text-center text-sm text-slate-400 pb-2">
            ¿Ya tienes una cuenta? <span className="text-[#8B31FF] font-bold cursor-pointer hover:underline">Iniciar Sesión</span>
        </div>
      </div>

    </div>
  );
};