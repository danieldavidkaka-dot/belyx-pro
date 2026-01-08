// Definiciones globales de tipos para compartir entre componentes

export type EventType = 'appointment' | 'meeting' | 'break' | 'empty';
export type ServiceStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Arrived' | 'Checking In' | 'STARTED';
// Unificamos los tipos de ubicación usados en los diferentes mocks
export type LocationType = 'In-Salon' | 'Home Visit' | 'A Domicilio' | 'Home Service';

export interface ScheduleItem {
  id: string;
  time: string;
  type: EventType;
  duration?: string;
  clientName?: string;
  serviceName?: string;
  clientImage?: string;
  locationType?: LocationType;
  distance?: string;
  status?: ServiceStatus;
  isVIP?: boolean;
  title?: string;
  subtitle?: string;
}

export interface AppointmentData {
  id: string;
  status: ServiceStatus;
  timeRange: string;
  date: string;
  client: {
    name: string;
    image: string;
    isVIP: boolean;
    type: LocationType;
  };
  service: {
    name: string;
    duration: string;
    price: number;
  };
  location: {
    address: string;
    city: string;
    gateCode?: string;
    coordinates: { lat: number; lng: number };
  };
  medicalAlert?: string;
}

export interface CheckInSession {
  bookingId: string;
  clientName: string;
  serviceName: string;
  serviceTime: string;
  clientImage: string;
  locationType: LocationType;
  status: ServiceStatus;
  qrCodeData?: string;
  numericCode?: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
  locationType: 'salon' | 'home' | 'both';
  nextAvailable: string;
  isTopRated?: boolean;
}
