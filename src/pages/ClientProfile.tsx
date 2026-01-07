import React from 'react';
import { 
  Settings, Edit2, MapPin, CreditCard, Smile, Heart, 
  ChevronRight, Bell, Shield, HelpCircle, LogOut, Calendar, Store 
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

// --- DATOS MOCK (Escalables) ---

const QUICK_ACTIONS = [
  { label: 'My Addresses', icon: <MapPin size={20} />, id: 'addresses' },
  { label: 'Payment', icon: <CreditCard size={20} />, id: 'payment' },
  { label: 'Preferences', icon: <Smile size={20} />, id: 'preferences' },
  { label: 'Favorites', icon: <Heart size={20} />, id: 'favorites' },
];

const RECENT_ACTIVITY = [
  {
    id: '1',
    service: 'Luxury Hair Spa',
    date: 'Oct 24',
    location: 'Downtown Salon',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200',
    type: 'salon'
  },
  {
    id: '2',
    service: 'Gel Manicure',
    date: 'Sep 12',
    location: 'At Home',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200',
    type: 'home'
  }
];

const MENU_ITEMS = [
  { label: 'Notifications', icon: <Bell size={18} /> },
  { label: 'Privacy & Security', icon: <Shield size={18} /> },
  { label: 'Help & Support', icon: <HelpCircle size={18} /> },
];

interface ClientProfileProps {
  onLogout: () => void;
  onNavigate: (screen: any) => void;
}

export default function ClientProfile({ onLogout, onNavigate }: ClientProfileProps) {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-28 font-sans">
      
      {/* 1. HEADER */}
      <div className="bg-white px-6 py-6 pb-8 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => onNavigate('home')} className="p-2 -ml-2 text-slate-900">
               {/* Flecha opcional si quisieras volver, o vacio para layout principal */}
               <div className="w-6" /> 
            </button>
            <h1 className="text-lg font-bold text-slate-900">My Profile</h1>
            <button className="p-2 -mr-2 text-slate-400 hover:text-purple-600 transition">
                <Settings size={22} />
            </button>
        </div>

        {/* PROFILE PICTURE WITH AURA */}
        <div className="flex flex-col items-center">
            <div className="relative mb-4">
                {/* Aura Gradient Ring */}
                <div className="absolute -inset-[3px] bg-gradient-to-tr from-[#8B31FF] to-[#00D4FF] rounded-full"></div>
                
                <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                    <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Edit Button */}
                <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-slate-100 text-purple-600 hover:scale-110 transition">
                    <Edit2 size={14} />
                </button>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900">Isabella Silva</h2>
            <p className="text-sm text-slate-400 font-medium">Member since 2023</p>
        </div>
      </div>

      {/* 2. LOYALTY CARD (HERO) */}
      <div className="px-6 -mt-4 mb-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-100 border border-white">
            {/* Soft Glow Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -z-10 opacity-50"></div>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Loyalty Status</p>
                    {/* Gradient Text */}
                    <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#8B31FF] to-[#00D4FF]">
                        Platinum Tier
                    </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                     <span className="text-lg">💎</span>
                </div>
            </div>

            <div className="flex items-end gap-1 mb-2">
                <span className="text-3xl font-bold text-slate-900">1,250</span>
                <span className="text-sm font-medium text-slate-400 mb-1.5">pts</span>
                <span className="ml-auto text-xs font-bold text-purple-600">Next: Diamond</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div className="h-full w-[70%] bg-gradient-to-r from-[#8B31FF] to-[#00D4FF] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 text-right mb-4">250 points to upgrade</p>

            <button 
                onClick={() => onNavigate('wallet')} // Conecta con la pantalla Rewards
                className="w-full py-3 bg-purple-50 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-100 transition flex items-center justify-center gap-1"
            >
                VIEW REWARDS HISTORY <ChevronRight size={12} />
            </button>
        </div>
      </div>

      {/* 3. QUICK ACTIONS GRID */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        {QUICK_ACTIONS.map((action) => (
            <button 
                key={action.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex flex-col items-center gap-3 hover:shadow-md transition active:scale-[0.98]"
            >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700">
                    {action.icon}
                </div>
                <span className="text-xs font-bold text-slate-700">{action.label}</span>
            </button>
        ))}
      </div>

      {/* 4. RECENT ACTIVITY */}
      <div className="px-6 mb-8">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
            <button className="text-xs font-bold text-purple-600">See All</button>
         </div>

         <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.service} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 bg-white p-0.5 rounded-tl-lg">
                            <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center text-purple-600">
                                {item.type === 'salon' ? <Store size={10} /> : <Calendar size={10} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.service}</h4>
                        <p className="text-xs text-slate-500 mb-1">{item.date} • {item.location}</p>
                        <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">
                            {item.status}
                        </span>
                    </div>

                    <button className="px-4 py-2 bg-purple-50 text-purple-700 text-xs font-bold rounded-xl hover:bg-purple-100 transition">
                        Rebook
                    </button>
                </div>
            ))}
         </div>
      </div>

      {/* 5. MENU ITEMS & LOGOUT */}
      <div className="px-6 pb-8">
         <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-50 mb-6">
            {MENU_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition">
                    <div className="flex items-center gap-3 text-slate-600">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                </div>
            ))}
         </div>

         <button 
            onClick={onLogout}
            className="w-full py-4 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition flex items-center justify-center gap-2"
         >
            Log Out
         </button>
         
         <p className="text-center text-[10px] text-slate-300 mt-6">
            BELYX App v2.4.0
         </p>
      </div>

      {/* 6. BOTTOM NAV */}
      <BottomNav 
        activeTab="profile" 
        onNavigate={onNavigate} 
      />

    </div>
  );
}