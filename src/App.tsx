import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

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

function AppRoutes() {
  const navigate = useNavigate();

  // --- FUNCIÓN CENTRAL DE NAVEGACIÓN (BOTTOM NAV) ---
  const handleBottomNav = (tab: 'home' | 'bookings' | 'wallet' | 'profile') => {
    const routes = {
      home: '/home',
      bookings: '/bookings',
      wallet: '/wallet',
      profile: '/profile'
    };
    navigate(routes[tab]);
  };

  return (
    <Routes>
      {/* --- LOGIN / BIENVENIDA --- */}
      <Route path="/" element={
        <Welcome 
          onStart={() => navigate('/home')} 
          onStaffLogin={() => navigate('/staff')} 
        />
      } />
      
      <Route path="/staff" element={
        <StaffLogin 
          onBack={() => navigate('/')}
          onLoginSuccess={() => navigate('/home')}
        />
      } />

      {/* --- SECCIONES PRINCIPALES --- */}
      <Route path="/home" element={
        <Home 
          onLogout={() => navigate('/')} 
          onSalonSelect={() => navigate('/salon')}
          onNavigate={handleBottomNav}
        />
      } />

      <Route path="/bookings" element={
        <MyBookings 
          onBack={() => navigate('/home')}
          onNavigate={handleBottomNav}
        />
      } />

      <Route path="/wallet" element={
        <MyRewards 
          onBack={() => navigate('/home')}
          onNavigate={handleBottomNav}
        />
      } />

      <Route path="/profile" element={
        <ClientProfile 
          onLogout={() => navigate('/')}
          onNavigate={handleBottomNav}
        />
      } />

      {/* --- FLUJO DE RESERVA --- */}
      <Route path="/salon" element={
        <SalonDetails 
          onBack={() => navigate('/home')} 
          onBook={() => navigate('/select-pro')} 
          onServiceSelect={() => navigate('/service')} 
        />
      } />

      <Route path="/service" element={
        <ServiceDetails 
          onBack={() => navigate('/salon')} 
          onBook={() => navigate('/select-pro')} 
          onServiceSelect={() => {}} 
        />
      } />

      <Route path="/select-pro" element={
        <SelectProfessional 
          onBack={() => navigate('/service')} 
          onSelect={() => navigate('/address')} 
        />
      } />

      <Route path="/address" element={
        <ServiceAddress 
          onBack={() => navigate('/select-pro')} 
          onConfirm={() => navigate('/payment')} 
        />
      } />

      <Route path="/payment" element={
        <SelectPayment 
          price={45.00} 
          onBack={() => navigate('/address')} 
          onConfirm={() => navigate('/track')} 
        />
      } />

      <Route path="/confirm" element={
        <ConfirmBooking 
          onBack={() => navigate('/payment')} 
          onConfirm={() => navigate('/home')} 
        />
      } />

      {/* --- FLUJO DE SERVICIO ACTIVO --- */}
      <Route path="/track" element={
        <TrackProfessional 
           onBack={() => navigate('/home')} 
           onCall={() => alert("Llamando al profesional... 📞")} 
           onArrival={() => navigate('/verification')} 
        />
      } />

      <Route path="/verification" element={
        <ServiceVerification 
          onBack={() => navigate('/track')} 
          onVerified={() => {
            alert("¡Servicio Completado! Puntos añadidos a tu Wallet 💎");
            navigate('/wallet');
          }}
        />
      } />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;