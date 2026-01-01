import React from 'react';

interface GradientButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const GradientButton = ({ text, onClick, icon }: GradientButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 flex items-center justify-center gap-2 text-lg hover:opacity-90 transition-opacity active:scale-95"
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};