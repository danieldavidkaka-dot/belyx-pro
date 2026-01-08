import { ScheduleItem, AppointmentData, CheckInSession } from '../types';

// Datos para la Agenda (Dashboard)
export const STAFF_SCHEDULE: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00 AM',
    type: 'meeting',
    title: 'Team Meeting',
    subtitle: 'Weekly Sync',
  },
  {
    id: '2',
    time: '10:30 AM',
    type: 'appointment',
    clientName: 'Maria G.',
    serviceName: 'Full Balayage & Cut',
    duration: '2h 30m',
    locationType: 'In-Salon',
    status: 'Confirmed',
    clientImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
  },
  {
    id: '3',
    time: '01:00 PM',
    type: 'appointment',
    clientName: 'Sophie L.',
    serviceName: 'Bridal Makeup Trial',
    locationType: 'Home Visit',
    distance: '5km away',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    isVIP: true,
  },
  {
    id: '4',
    time: '03:00 PM',
    type: 'break',
    title: 'Lunch Break',
    duration: '1h',
  },
  {
    id: '5',
    time: '04:00 PM',
    type: 'empty',
  }
];

// Datos para el Detalle de la Cita
export const CURRENT_APPOINTMENT: AppointmentData = {
  id: '#4092',
  status: 'Confirmed',
  timeRange: '14:00 - 15:30',
  date: 'JULY 24, 2024',
  client: {
    name: 'Ana López',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    isVIP: true,
    type: 'Home Service'
  },
  service: {
    name: 'Luxury Manicure',
    duration: '90 mins',
    price: 120
  },
  location: {
    address: 'Av. Oaxaca 12, Roma Nte.',
    city: 'Cuauhtémoc, 06700 Ciudad de México',
    gateCode: '4892#',
    coordinates: { lat: 19.4, lng: -99.1 }
  },
  medicalAlert: 'Client is allergic to latex products. Please ensure all equipment is latex-free and use nitrile gloves.'
};
