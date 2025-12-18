import { 
  FaHeart, 
  FaBrain, 
  FaBone, 
  FaChild, 
  FaEye, 
  FaTooth,
  FaLungs,
  FaStethoscope 
} from 'react-icons/fa';
import { 
  MdLocalHospital, 
  MdPregnantWoman, 
  MdPsychology,
  MdBloodtype 
} from 'react-icons/md';

export interface Department {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const departmentData: Department[] = [
  {
    id: 1,
    name: 'Cardiology',
    description: 'Comprehensive heart care with advanced diagnostic and treatment facilities.',
    icon: FaHeart,
    color: '#ef4444',
  },
  {
    id: 2,
    name: 'Neurology',
    description: 'Expert care for brain, spine, and nervous system disorders.',
    icon: FaBrain,
    color: '#8b5cf6',
  },
  {
    id: 3,
    name: 'Orthopedics',
    description: 'Specialized treatment for bone, joint, and muscle conditions.',
    icon: FaBone,
    color: '#f59e0b',
  },
  {
    id: 4,
    name: 'Pediatrics',
    description: 'Dedicated healthcare services for infants, children, and adolescents.',
    icon: FaChild,
    color: '#10b981',
  },
  {
    id: 5,
    name: 'Ophthalmology',
    description: 'Advanced eye care and vision correction services.',
    icon: FaEye,
    color: '#0284c7',
  },
  {
    id: 6,
    name: 'Dentistry',
    description: 'Complete dental care from routine checkups to advanced procedures.',
    icon: FaTooth,
    color: '#06b6d4',
  },
  {
    id: 7,
    name: 'Pulmonology',
    description: 'Respiratory care for lung and breathing disorders.',
    icon: FaLungs,
    color: '#14b8a6',
  },
  {
    id: 8,
    name: 'General Medicine',
    description: 'Primary care and treatment for a wide range of health conditions.',
    icon: FaStethoscope,
    color: '#0f766e',
  },
  {
    id: 9,
    name: 'Emergency Care',
    description: '24/7 emergency services with rapid response team.',
    icon: MdLocalHospital,
    color: '#dc2626',
  },
  {
    id: 10,
    name: 'Obstetrics & Gynecology',
    description: 'Comprehensive women\'s health and maternity care.',
    icon: MdPregnantWoman,
    color: '#ec4899',
  },
  {
    id: 11,
    name: 'Psychiatry',
    description: 'Mental health services and psychological counseling.',
    icon: MdPsychology,
    color: '#6366f1',
  },
  {
    id: 12,
    name: 'Hematology',
    description: 'Specialized care for blood disorders and diseases.',
    icon: MdBloodtype,
    color: '#e11d48',
  },
];

export default departmentData;
