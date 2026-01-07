import { useState } from 'react';

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

type ScreenType = 'welcome' | 'home' | 'salonDetails' | 'serviceDetails' | 'selectPro' | 'serviceAddress' | 'selectPayment' | 'confirm' | 'staff' | 'trackPro';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home 
            onLogout={() => setCurrentScreen('welcome')}
            onSalonSelect={() => setCurrentScreen('salonDetails')}
          />
        );

      case 'salonDetails':
        return (
          <SalonDetails 
            onBack={() => setCurrentScreen('home')}
            onServiceSelect={() => setCurrentScreen('serviceDetails')}
            onBook={() => setCurrentScreen('selectPro')}
          />
        );

      case 'serviceDetails':
        return (
          <ServiceDetails 
            onBack={() => setCurrentScreen('salonDetails')}
            onBook={() => setCurrentScreen('selectPro')}
          />
        );

      case 'selectPro':
        return (
          <SelectProfessional 
            onBack={() => setCurrentScreen('salonDetails')}
            onSelect={(proId) => {
              console.log("Selected Pro:", proId);
              setCurrentScreen('serviceAddress');
            }}
          />
        );

      case 'serviceAddress':
        return (
          <ServiceAddress 
            onBack={() => setCurrentScreen('selectPro')}
            onConfirm={(address) => {
              console.log("Address:", address);
              setCurrentScreen('selectPayment');
            }}
          />
        );

      case 'selectPayment':
        return (
          <SelectPayment 
            price={45.00}
            onBack={() => setCurrentScreen('serviceAddress')}
            onConfirm={() => {
              console.log("Pago procesado");
              setCurrentScreen('trackPro');
            }}
          />
        );

      case 'trackPro':
        return (
          <TrackProfessional 
             onBack={() => setCurrentScreen('home')}
          />
        );

      case 'confirm':
        return (
          <ConfirmBooking 
            onBack={() => setCurrentScreen('selectPayment')}
            onConfirm={() => setCurrentScreen('trackPro')}
          />
        );

      case 'staff':
        return (
          <StaffLogin 
            onBack={() => setCurrentScreen('welcome')}
            onLoginSuccess={() => setCurrentScreen('home')}
          />
        );
      
      case 'welcome':
      default:
        return (
          <Welcome 
            onStart={() => setCurrentScreen('home')} 
            onStaffLogin={() => setCurrentScreen('staff')} 
          />
        );
    }
  };

  return <>{renderScreen()}</>;
}

export default App;
