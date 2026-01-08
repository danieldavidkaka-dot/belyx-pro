import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// =========================================
// 1. IMPORTACIONES: ZONA PÚBLICA & AUTH
// =========================================
import { Welcome } from './pages/Welcome';
import StaffLogin from './pages/StaffLogin';

// =========================================
// 2. IMPORTACIONES: ZONA CLIENTE (CONSUMIDOR)
// =========================================
import { Home } from './pages/Home';
import { SalonDetails } from './pages/SalonDetails';
import ServiceDetails from './pages/ServiceDetails';
import SelectProfessional from './pages/SelectProfessional';
import ServiceAddress from './pages/ServiceAddress';
import SelectPayment from './pages/SelectPayment';
import { ConfirmBooking } from './pages/ConfirmBooking';
import TrackProfessional from './pages/TrackProfessional';
import ServiceVerification from './pages/ServiceVerification';
import MyBookings from './pages/MyBookings';
import MyRewards from './pages/MyRewards';
import ClientProfile from './pages/ClientProfile';

// =========================================
// 3. IMPORTACIONES: ZONA STAFF (PROFESIONAL)
// =========================================
import StaffDashboard from './pages/StaffDashboard';
import StaffAppointmentDetails from './pages/StaffAppointmentDetails';
import StaffNavigation from './pages/StaffNavigation';
import StaffCheckIn from './pages/StaffCheckIn';
import StaffEmergency from './pages/StaffEmergency';
import StaffServiceCompletion from './pages/StaffServiceCompletion'; // <--- NUEVA PANTALLA

function AppRoutes() {
  const navigate = useNavigate();

  // Función de navegación para el menú inferior del Cliente
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
          ZONA STAFF (FLUJO DEL PROFESIONAL)
      ========================================= */}
      
      {/* 1. Login Staff */}
      <Route path="/staff" element={
        <StaffLogin 
          onBack={() => navigate('/')}
          onLoginSuccess={() => navigate('/staff-dashboard')} 
        />
      } />

      {/* 2. Dashboard (Agenda) */}
      <Route path="/staff-dashboard" element={
  <StaffDashboard onLogout={() => navigate('/')} />
} />

      {/* 3. Detalle de Cita (Slide to Start) */}
      <Route path="/staff-appointment" element={
        <StaffAppointmentDetails 
          onBack={() => navigate('/staff-dashboard')}
          onStartJob={() => navigate('/staff-navigation')}
        />
      } />

      {/* 4. Navegación GPS (Mapa) */}
      <Route path="/staff-navigation" element={
        <StaffNavigation 
          onBack={() => navigate('/staff-appointment')} 
          onArrived={() => {
             alert("¡Has llegado al destino! 📍");
             navigate('/staff-checkin');
          }}
        />
      } />

      {/* 5. Check-in de Seguridad */}
      <Route path="/staff-checkin" element={
        <StaffCheckIn 
          onBack={() => navigate('/staff-navigation')}
          onCheckInSuccess={() => {
             alert("¡Check-in Exitoso! El servicio ha comenzado. ⏱️");
             // Simulamos el fin del servicio yendo a completion
             navigate('/staff-completion'); 
          }}
        />
      } />

      {/* 6. Cierre de Servicio (Feedback & Notas) - NUEVO */}
      <Route path="/staff-completion" element={
        <StaffServiceCompletion 
          onClose={() => navigate('/staff-dashboard')} 
          onComplete={() => {
             alert("¡Servicio Cerrado y Guardado! 💾");
             navigate('/staff-dashboard'); // Ciclo completado
          }}
        />
      } />

      {/* 7. Botón de Pánico (SOS) - Accesible siempre */}
      <Route path="/staff-emergency" element={
        <StaffEmergency onBack={() => navigate(-1)} />
      } />

      {/* =========================================
          ZONA CLIENTE (FLUJO DEL USUARIO)
      ========================================= */}
      
      {/* Secciones Principales */}
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

      {/* Flujo de Reserva */}
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

      {/* Flujo de Servicio Activo (Cliente) */}
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