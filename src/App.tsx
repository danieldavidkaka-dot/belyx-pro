import { useState } from 'react';

// --- IMPORTACIONES DE TODAS LAS PÁGINAS ---
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { ConfirmBooking } from './pages/ConfirmBooking';
import { SalonDetails } from './pages/SalonDetails';
import ServiceDetails from './pages/ServiceDetails';
import StaffLogin from './pages/StaffLogin';
import SelectProfessional from './pages/SelectProfessional';
import ServiceAddress from './pages/ServiceAddress';
import SelectPayment from './pages/SelectPayment';
import TrackProfessional from './pages/TrackProfessional';
import ServiceVerification from './pages/ServiceVerification';
import MyBookings from './pages/MyBookings';
import MyRewards from './pages/MyRewards';
import ClientProfile from './pages/ClientProfile';

// --- DEFINICIÓN DE TIPOS (Estados de navegación) ---
type ScreenType = 
  | 'welcome' 
  | 'home' 
  | 'salonDetails' 
  | 'serviceDetails' 
  | 'selectPro' 
  | 'serviceAddress' 
  | 'selectPayment' 
  | 'trackPro' 
  | 'verification' 
  | 'confirm' 
  | 'staff' 
  | 'bookings' 
  | 'wallet' 
  | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  // --- FUNCIÓN CENTRAL DE NAVEGACIÓN (BOTTOM NAV) ---
  // Esta función permite que la barra inferior cambie entre las secciones principales
  const handleBottomNav = (tab: 'home' | 'bookings' | 'wallet' | 'profile') => {
     if (tab === 'home') setCurrentScreen('home');
     if (tab === 'bookings') setCurrentScreen('bookings');
     if (tab === 'wallet') setCurrentScreen('wallet');
     if (tab === 'profile') setCurrentScreen('profile');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      
      // --- SECCIONES PRINCIPALES (Con Barra Inferior) ---

      case 'home':
        return (
          <Home 
            onLogout={() => setCurrentScreen('welcome')} 
            onSalonSelect={() => setCurrentScreen('salonDetails')}
            onNavigate={handleBottomNav}
          />
        );

      case 'bookings':
        return (
          <MyBookings 
            onBack={() => setCurrentScreen('home')}
            onNavigate={handleBottomNav}
          />
        );

      case 'wallet':
        return (
          <MyRewards 
            onBack={() => setCurrentScreen('home')}
            onNavigate={handleBottomNav}
          />
        );

      case 'profile':
        return (
          <ClientProfile 
            onLogout={() => setCurrentScreen('welcome')}
            onNavigate={handleBottomNav}
          />
        );

      // --- FLUJO DE RESERVA ---

      case 'salonDetails':
        return (
          <SalonDetails 
            onBack={() => setCurrentScreen('home')} 
            onBook={() => setCurrentScreen('selectPro')} 
            onServiceSelect={() => setCurrentScreen('serviceDetails')} 
          />
        );

      case 'serviceDetails':
        return (
          <ServiceDetails 
            onBack={() => setCurrentScreen('salonDetails')} 
            onBook={() => setCurrentScreen('selectPro')} 
            onServiceSelect={() => {}} 
          />
        );

      case 'selectPro':
        return (
          <SelectProfessional 
            onBack={() => setCurrentScreen('serviceDetails')} 
            onSelect={() => setCurrentScreen('serviceAddress')} 
          />
        );

      case 'serviceAddress':
        return (
          <ServiceAddress 
            onBack={() => setCurrentScreen('selectPro')} 
            onConfirm={() => setCurrentScreen('selectPayment')} 
          />
        );

      case 'selectPayment':
        return (
          <SelectPayment 
            price={45.00} 
            onBack={() => setCurrentScreen('serviceAddress')} 
            onConfirm={() => setCurrentScreen('trackPro')} 
          />
        );

      // --- FLUJO DE SERVICIO ACTIVO (Operaciones) ---

      case 'trackPro':
        return (
          <TrackProfessional 
             onBack={() => setCurrentScreen('home')} 
             onCall={() => alert("Llamando al profesional... 📞")} 
             onArrival={() => setCurrentScreen('verification')} 
          />
        );

      case 'verification':
        return (
          <ServiceVerification 
            onBack={() => setCurrentScreen('trackPro')} 
            onVerified={() => {
              alert("¡Servicio Completado! Puntos añadidos a tu Wallet 💎");
              setCurrentScreen('wallet'); // Redirige a Wallet para ver los puntos
            }}
          />
        );

      case 'confirm':
        return (
          <ConfirmBooking 
            onBack={() => setCurrentScreen('selectPayment')} 
            onConfirm={() => setCurrentScreen('home')} 
          />
        );

      // --- LOGIN / STAFF ---
      
      case 'welcome':
        return (
          <Welcome 
             onStart={() => setCurrentScreen('home')} 
             onStaffLogin={() => setCurrentScreen('staff')}
          />
        );
      
      case 'staff':
        return (
          <StaffLogin 
            onBack={() => setCurrentScreen('welcome')}
            onLoginSuccess={() => setCurrentScreen('home')}
          />
        );
      
      default:
        return <Welcome onStart={() => setCurrentScreen('home')} onStaffLogin={() => setCurrentScreen('staff')} />;
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
}

export default App;