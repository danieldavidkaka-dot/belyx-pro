import { useState } from 'react';

// Importaciones
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

// Definición de Tipos
type ScreenType = 
  | 'welcome' | 'home' | 'salonDetails' | 'serviceDetails' | 'selectPro' 
  | 'serviceAddress' | 'selectPayment' | 'trackPro' | 'verification' 
  | 'confirm' | 'staff' | 'bookings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  // Función Central de Navegación del Menú Inferior
  const handleBottomNav = (tab: 'home' | 'bookings' | 'wallet' | 'profile') => {
     if (tab === 'home') setCurrentScreen('home');
     if (tab === 'bookings') setCurrentScreen('bookings');
     // if (tab === 'profile') setCurrentScreen('profile'); // Futuro
     // if (tab === 'wallet') setCurrentScreen('wallet'); // Futuro
  };

  const renderScreen = () => {
    switch (currentScreen) {
      
      // --- 1. HOME (CORREGIDO) ---
      case 'home':
        return (
          <Home 
            // AHORA SÍ: Logout lleva a Welcome
            onLogout={() => setCurrentScreen('welcome')} 
            onSalonSelect={() => setCurrentScreen('salonDetails')}
            // NUEVO: Conectamos la barra de abajo
            onNavigate={handleBottomNav}
          />
        );

      // --- 2. MY BOOKINGS ---
      case 'bookings':
        return (
          <MyBookings 
            onBack={() => setCurrentScreen('home')}
            onNavigate={handleBottomNav}
          />
        );

      // --- 3. FLUJO DE RESERVA ---
      case 'salonDetails':
        return <SalonDetails onBack={() => setCurrentScreen('home')} onBook={() => setCurrentScreen('selectPro')} onServiceSelect={() => setCurrentScreen('serviceDetails')} />;
      
      case 'serviceDetails':
        return <ServiceDetails onBack={() => setCurrentScreen('salonDetails')} onBook={() => setCurrentScreen('selectPro')} onServiceSelect={() => {}} />;
      
      case 'selectPro':
        return <SelectProfessional onBack={() => setCurrentScreen('serviceDetails')} onSelect={() => setCurrentScreen('serviceAddress')} />;
      
      case 'serviceAddress':
        return <ServiceAddress onBack={() => setCurrentScreen('selectPro')} onConfirm={() => setCurrentScreen('selectPayment')} />;
      
      case 'selectPayment':
        return <SelectPayment price={45} onBack={() => setCurrentScreen('serviceAddress')} onConfirm={() => setCurrentScreen('trackPro')} />;
      
      case 'trackPro':
        return <TrackProfessional onBack={() => setCurrentScreen('home')} onCall={() => alert("Llamando...")} onArrival={() => setCurrentScreen('verification')} />;
      
      case 'verification':
        return <ServiceVerification onBack={() => setCurrentScreen('trackPro')} onVerified={() => { alert("¡Servicio Finalizado!"); setCurrentScreen('bookings'); }} />;
      
      case 'confirm':
        return <ConfirmBooking onBack={() => setCurrentScreen('selectPayment')} onConfirm={() => setCurrentScreen('home')} />;

      // --- 4. LOGIN ---
      case 'welcome': return <Welcome onStart={() => setCurrentScreen('home')} onStaffLogin={() => setCurrentScreen('staff')} />;
      case 'staff': return <StaffLogin onBack={() => setCurrentScreen('welcome')} onLoginSuccess={() => setCurrentScreen('home')} />;
      
      default: return <Welcome onStart={() => setCurrentScreen('home')} onStaffLogin={() => setCurrentScreen('staff')} />;
    }
  };

  return <>{renderScreen()}</>;
}

export default App;