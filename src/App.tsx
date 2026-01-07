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
import StaffDashboard from './pages/StaffDashboard';
import StaffAppointmentDetails from './pages/StaffAppointmentDetails';
import StaffNavigation from './pages/StaffNavigation';
import StaffCheckIn from './pages/StaffCheckIn'; // <--- LA NUEVA PANTALLA

function AppRoutes() {
  const navigate = useNavigate();

  // --- FUNCIÓN CENTRAL DE NAVEGACIÓN (BOTTOM NAV CLIENTE) ---
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
      {/* =========================================
          ZONA PÚBLICA / ONBOARDING
      ========================================= */}
      <Route path="/" element={
        <Welcome 
          onStart={() => navigate('/home')} 
          onStaffLogin={() => navigate('/staff')} 
        />
      } />
      
      {/* =========================================
          ZONA STAFF (PROFESIONALES)
      ========================================= */}
      
      {/* Login de Staff */}
      <Route path="/staff" element={
        <StaffLogin 
          onBack={() => navigate('/')}
          onLoginSuccess={() => navigate('/staff-dashboard')} 
        />
      } />

      {/* Dashboard Principal (Agenda) */}
      <Route path="/staff-dashboard" element={
        <StaffDashboard 
          onLogout={() => navigate('/')}
          onNavigate={(screen) => {
             // Si selecciona ver una cita (ej. desde la tarjeta VIP)
             if (screen === 'appointment-details') navigate('/staff-appointment');
          }}
        />
      } />

      {/* Detalle de la Cita (Slide to Start) */}
      <Route path="/staff-appointment" element={
        <StaffAppointmentDetails 
          onBack={() => navigate('/staff-dashboard')}
          onStartJob={() => {
             // Al deslizar, inicia el viaje y va al Mapa
             navigate('/staff-navigation');
          }}
        />
      } />

      {/* Navegación GPS (Mapa Oscuro) */}
      <Route path="/staff-navigation" element={
        <StaffNavigation 
          onBack={() => navigate('/staff-appointment')} 
          onArrived={() => {
             alert("¡Has llegado al destino! 📍");
             // AL LLEGAR, PASAMOS AL CHECK-IN DE SEGURIDAD
             navigate('/staff-checkin');
          }}
        />
      } />

      {/* Check-in en Sitio (QR / Código) */}
      <Route path="/staff-checkin" element={
        <StaffCheckIn 
          onBack={() => navigate('/staff-navigation')}
          onCheckInSuccess={() => {
             alert("¡Check-in Exitoso! ✅ El servicio ha comenzado.");
             // Aquí cerramos el ciclo por ahora volviendo al dashboard
             navigate('/staff-dashboard'); 
          }}
        />
      } />

      {/* =========================================
          ZONA CLIENTE (CONSUMIDOR FINAL)
      ========================================= */}
      
      {/* 1. Secciones Principales (Bottom Bar) */}
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

      {/* 2. Flujo de Reserva */}
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
          onSelect={(proId) => {
             console.log("Pro:", proId);
             navigate('/address');
          }} 
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

      {/* 3. Servicio Activo (Cliente rastreando al Staff) */}
      <Route path="/track" element={
        <TrackProfessional 
           onBack={() => navigate('/home')} 
           onCall={() => alert("Llamando...")} 
           onArrival={() => navigate('/verification')} 
        />
      } />

      <Route path="/verification" element={
        <ServiceVerification 
          onBack={() => navigate('/track')} 
          onVerified={() => {
            alert("¡Servicio Completado! Puntos añadidos.");
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