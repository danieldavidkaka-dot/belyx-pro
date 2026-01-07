import { useState } from 'react';

// --- IMPORTACIONES DE PÁGINAS ---
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { ConfirmBooking } from './pages/ConfirmBooking';
import { SalonDetails } from './pages/SalonDetails';
import ServiceDetails from './pages/ServiceDetails';
import StaffLogin from './pages/StaffLogin';
import SelectProfessional from './pages/SelectProfessional';

// 1. IMPORTACIÓN NUEVA: Pantalla de Dirección
import ServiceAddress from './pages/ServiceAddress';

// 2. TIPO ACTUALIZADO: Agregamos 'serviceAddress'
type ScreenType = 'welcome' | 'home' | 'salonDetails' | 'serviceDetails' | 'selectPro' | 'serviceAddress' | 'confirm' | 'staff';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      
      // 1. BIENVENIDA
      case 'welcome':
        return (
          <Welcome 
             onStart={() => setCurrentScreen('home')} 
             onStaffLogin={() => setCurrentScreen('staff')}
          />
        );
      
      // 2. HOME
      case 'home':
        return (
          <Home 
            onLogout={() => setCurrentScreen('welcome')}
            onSalonSelect={() => setCurrentScreen('salonDetails')}
          />
        );
      
      // 3. DETALLES DEL SALÓN
      case 'salonDetails':
        return (
          <SalonDetails 
            onBack={() => setCurrentScreen('home')}
            onBook={() => setCurrentScreen('confirm')}
            onServiceSelect={() => setCurrentScreen('serviceDetails')} 
          />
        );

      // 4. DETALLES DEL SERVICIO
      case 'serviceDetails':
        return (
          <ServiceDetails 
            onBack={() => setCurrentScreen('salonDetails')}
            // Al reservar, primero elegimos PROFESIONAL
            onBook={() => setCurrentScreen('selectPro')} 
            onServiceSelect={() => console.log("Servicio seleccionado")} 
          />
        );

      // 5. SELECCIÓN DE PROFESIONAL
      case 'selectPro':
        return (
          <SelectProfessional 
            onBack={() => setCurrentScreen('serviceDetails')}
            onSelect={(proId) => {
              console.log("Profesional seleccionado:", proId);
              // Después de elegir pro, vamos a la DIRECCIÓN
              setCurrentScreen('serviceAddress'); 
            }}
          />
        );

      // 6. NUEVA PANTALLA: DIRECCIÓN DE SERVICIO
      case 'serviceAddress':
        return (
          <ServiceAddress 
            onBack={() => setCurrentScreen('selectPro')} // Volver a elegir profesional
            onConfirm={(addressId) => {
              console.log("Dirección confirmada:", addressId);
              setCurrentScreen('confirm'); // Finalmente confirmamos
            }}
          />
        );

      // 7. CONFIRMAR RESERVA
      case 'confirm':
        return (
          <ConfirmBooking 
            // Si vuelve atrás, regresa a Dirección (flujo lógico)
            onBack={() => setCurrentScreen('serviceAddress')}
            onConfirm={() => {
              alert('¡Reserva Confirmada! 🎉');
              setCurrentScreen('home');
            }} 
          />
        );

      // 8. LOGIN DE STAFF
      case 'staff':
        return (
          <StaffLogin 
            onBack={() => setCurrentScreen('welcome')}
            onLoginSuccess={() => {
              alert("¡Bienvenido al sistema interno! 🔓");
              setCurrentScreen('home'); 
            }}
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