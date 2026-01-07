import { useState } from 'react';

// --- 1. IMPORTACIONES DE TODAS LAS PÁGINAS ---
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
import ServiceVerification from './pages/ServiceVerification'; // <--- Nueva importación

// --- 2. DEFINICIÓN DE TIPOS (Todas las pantallas posibles) ---
type ScreenType = 
  | 'welcome' 
  | 'home' 
  | 'salonDetails' 
  | 'serviceDetails' 
  | 'selectPro' 
  | 'serviceAddress' 
  | 'selectPayment' 
  | 'trackPro' 
  | 'verification' // <--- Nuevo estado
  | 'confirm' 
  | 'staff';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      
      // --- FLUJO DE INICIO ---
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

      case 'home':
        return (
          <Home 
            onLogout={() => setCurrentScreen('welcome')}
            onSalonSelect={() => setCurrentScreen('salonDetails')}
          />
        );
      
      // --- FLUJO DE RESERVA ---
      case 'salonDetails':
        return (
          <SalonDetails 
            onBack={() => setCurrentScreen('home')}
            onBook={() => setCurrentScreen('selectPro')} // Atajo a reservar
            onServiceSelect={() => setCurrentScreen('serviceDetails')} 
          />
        );

      case 'serviceDetails':
        return (
          <ServiceDetails 
            onBack={() => setCurrentScreen('salonDetails')}
            onBook={() => setCurrentScreen('selectPro')} // Paso 1: Elegir Pro
            onServiceSelect={() => console.log("Servicio Info")} 
          />
        );

      case 'selectPro':
        return (
          <SelectProfessional 
            onBack={() => setCurrentScreen('serviceDetails')}
            onSelect={(proId) => {
              console.log("Pro seleccionado:", proId);
              setCurrentScreen('serviceAddress'); // Paso 2: Elegir Dirección
            }}
          />
        );

      case 'serviceAddress':
        return (
          <ServiceAddress 
            onBack={() => setCurrentScreen('selectPro')}
            onConfirm={(addrId) => {
              console.log("Dirección:", addrId);
              setCurrentScreen('selectPayment'); // Paso 3: Pagar
            }}
          />
        );

      case 'selectPayment':
        return (
          <SelectPayment 
            price={120.00}
            onBack={() => setCurrentScreen('serviceAddress')}
            onConfirm={() => {
              console.log("Pago exitoso");
              setCurrentScreen('trackPro'); // Paso 4: Tracking (Uber Style)
            }}
          />
        );

      // --- FLUJO DE SERVICIO ACTIVO ---
      case 'trackPro':
        return (
          <TrackProfessional 
             // 1. Si da atrás, vuelve al Home (correcto UX)
             onBack={() => setCurrentScreen('home')} 
             
             // 2. Si llama, solo mostramos alerta (simulando teléfono)
             onCall={() => alert("Llamando a Sarah Jenkins... 📞")}

             // 3. NUEVO: Si presiona el botón "Simulate Arrival", va a Verificación
             onArrival={() => setCurrentScreen('verification')}
          />
        );

      case 'verification':
        return (
          <ServiceVerification 
            onBack={() => setCurrentScreen('trackPro')} // Volver al mapa si fue error
            onVerified={() => {
              alert("¡Servicio Verificado y Comenzado! ✅");
              setCurrentScreen('home'); // Cierre del ciclo
            }}
          />
        );

      // --- OTROS / FALLBACKS ---
      case 'confirm':
        return (
          <ConfirmBooking 
            onBack={() => setCurrentScreen('selectPayment')}
            onConfirm={() => setCurrentScreen('home')} 
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