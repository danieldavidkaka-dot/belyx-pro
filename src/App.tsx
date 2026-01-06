import { useState } from 'react';

// --- IMPORTACIONES DE PÁGINAS ---
// Nota: Si usas "export const" en tus archivos viejos, usa { Llaves }.
// Si usas "export default" (como en los nuevos que hicimos), usa Sin Llaves.

import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { ConfirmBooking } from './pages/ConfirmBooking';

// Estos dos los creamos con "export default", así que van SIN llaves:
import { SalonDetails } from './pages/SalonDetails';
import ServiceDetails from './pages/ServiceDetails';

// Definimos los nombres de las pantallas
type ScreenType = 'welcome' | 'home' | 'salonDetails' | 'serviceDetails' | 'confirm';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      
      // 1. BIENVENIDA
      case 'welcome':
        return (
          <div onClick={() => setCurrentScreen('home')}>
            <Welcome />
          </div>
        );
      
      // 2. HOME (Lista de Salones)
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
            // Si tiene un botón directo de reservar, va a confirmar
            onBook={() => setCurrentScreen('confirm')}
            // Si selecciona un servicio específico, va al detalle del servicio
            onServiceSelect={() => setCurrentScreen('serviceDetails')} 
          />
        );

      // 4. DETALLES DEL SERVICIO (La nueva pantalla)
      case 'serviceDetails':
        return (
          <ServiceDetails 
            // Si regresa, vuelve al Salón
            onBack={() => setCurrentScreen('salonDetails')}
            // Si reserva, va a Confirmación
            onBook={() => setCurrentScreen('confirm')}
          />
        );

      // 5. CONFIRMAR RESERVA
      case 'confirm':
        return (
          <ConfirmBooking 
            // Si quiere editar, vuelve al Servicio
            onBack={() => setCurrentScreen('serviceDetails')}
            // Al confirmar, termina el flujo y vuelve al Home
            onConfirm={() => {
              alert('¡Reserva Confirmada! 🎉');
              setCurrentScreen('home');
            }} 
          />
        );
      
      // Default (Seguridad)
      default:
        return <Welcome />;
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
}

export default App;