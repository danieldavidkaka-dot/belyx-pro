import React from 'react';
import { GradientButton } from '../components/GradientButton';

// 1. Definimos las props para que la pantalla sea funcional
interface WelcomeProps {
  onStart: () => void;
  onStaffLogin: () => void;
}

export const Welcome = ({ onStart, onStaffLogin }: WelcomeProps) => {
  return (
    <div className="h-[100dvh] w-full bg-white flex flex-col items-center px-6 py-6 font-sans overflow-hidden supports-[height:100cqh]:h-[100cqh]">
      
      {/* SECCIÓN SUPERIOR */}
      <div className="flex flex-col items-center shrink-0">
        
        {/* LOGO */}
        <div className="mb-2"> 
            <img 
                src="https://iili.io/fXbZvWu.md.png" 
                alt="BELYX Logo" 
                className="w-60 h-auto object-contain" 
            />
        </div>

        {/* TEXTO */}
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

      {/* SECCIÓN INFERIOR: Acciones */}
      <div className="w-full max-w-md shrink-0">
        {/* Botón Principal conectado a onStart */}
        <GradientButton 
            text="Comenzar" 
            onClick={onStart}
            fullWidth={true}
        />
        
        {/* Enlace de Login conectado a onStaffLogin */}
        <div className="mt-4 text-center text-sm text-slate-400 pb-2">
            ¿Ya tienes una cuenta? {' '}
            <button 
                onClick={onStaffLogin}
                className="text-[#8B31FF] font-bold cursor-pointer hover:underline focus:outline-none"
            >
                Iniciar Sesión
            </button>
        </div>
      </div>

    </div>
  );
};