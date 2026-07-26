export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

import { Dimensions } from 'react-native';
import {
  DeadBodyAmbulance,
  NormalAmbulance,
  VentilatorAmbulance,
} from '../assets/images/pngs';

export const ambulanceImages: Record<string, any> = {
  NORMAL: NormalAmbulance,
  VENTILATOR: VentilatorAmbulance,
  DEAD_BODY: DeadBodyAmbulance,
};

export const reasons_user = [
  {
    id: '1',
    title: "Driver didn't answer",
    icon: 'phone-remove',
  },
  {
    id: '2',
    title: 'Driver not at pickup',
    icon: 'map-marker-remove',
  },
  {
    id: '3',
    title: 'Driver asked me to cancel',
    icon: 'account-cancel',
  },
  {
    id: '4',
    title: 'Driver on wrong route',
    icon: 'routes',
  },
  {
    id: '5',
    title: 'Ambulance arrived early',
    icon: 'clock-alert-outline',
  },
  {
    id: '6',
    title: 'Other',
    icon: 'help-circle-outline',
  },
];

export const reasons_driver = [
  {
    id: '1',
    title: 'Patient did not answer',
    icon: 'phone-remove',
  },
  {
    id: '2',
    title: 'Patient not at pickup',
    icon: 'map-marker-remove',
  },
  {
    id: '3',
    title: 'Unable to reach pickup location',
    icon: 'road-variant',
  },
  {
    id: '4',
    title: 'Vehicle issue / Breakdown',
    icon: 'car-wrench',
  },
  {
    id: '5',
    title: 'Emergency call received',
    icon: 'ambulance',
  },
  {
    id: '6',
    title: 'Safety concerns',
    icon: 'shield-alert',
  },
  {
    id: '7',
    title: 'Patient requested cancellation',
    icon: 'account-cancel',
  },
  {
    id: '8',
    title: 'Other',
    icon: 'help-circle-outline',
  },
];
