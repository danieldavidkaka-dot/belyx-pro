import { useState } from 'react';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { SalonDetails } from './pages/SalonDetails';
import { ConfirmBooking } from './pages/ConfirmBooking';

// Definimos todas las pantallas posibles de la App
type ScreenType = 'welcome' | 'home' | 'details' | 'confirm';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      
      // 1. PANTALLA DE BIENVENIDA
      case 'welcome':
        return (
          <div onClick={() => setCurrentScreen('home')}>
            <Welcome />
          </div>
        );
      
      // 2. PANTALLA PRINCIPAL (HOME)
      case 'home':
        return (
            <Home 
                onLogout={() => setCurrentScreen('welcome')}
                // Al hacer clic en una tarjeta de salón, vamos a los detalles
                onSalonSelect={() => setCurrentScreen('details')}
                // (Opcional) Si en el futuro quieres que "At Home" lleve a otro lado, lo configuraríamos aquí
            />
        );
      
      // 3. DETALLES DEL SALÓN
      case 'details':
        return (
            <SalonDetails 
                onBack={() => setCurrentScreen('home')}
                // NUEVO: Al dar clic en el botón negro "Book Now", vamos a Confirmar
                onBook={() => setCurrentScreen('confirm')} 
            />
        );

      // 4. CONFIRMAR RESERVA (La nueva pantalla)
      case 'confirm':
        return (
            <ConfirmBooking 
                // Si quieren editar, vuelven atrás (al detalle)
                onBack={() => setCurrentScreen('details')}
                // Acción final de confirmación
                onConfirm={() => {
                  alert('¡Reserva Confirmada con Éxito! 🎉\n(Aquí se procesaría el pago)');
                  setCurrentScreen('home'); // Regresamos al inicio
                }} 
            />
        );
      
      // Default (Por si acaso falla algo)
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