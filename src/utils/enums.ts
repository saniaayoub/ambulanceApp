// Environment Enums
export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
}
export enum Roles {
  USER = 'USER',
  DRIVER = 'DRIVER',
}

export const TRIP_STATUS = {
  SEARCHING: 'SEARCHING',
  ASSIGNED: 'ASSIGNED',
  ARRIVED: 'ARRIVED',
  WAITING: 'WAITING',
  STARTED: 'STARTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const AMBULANCE_TYPE = {
  NORMAL: 'NORMAL',
  VENTILATOR: 'VENTILATOR',
  DEAD_BODY: 'DEAD_BODY',
};

export const PAYMENT_METHOD = {
  CASH: 'CASH',
  JAZZCASH: 'JAZZCASH',
  EASYPAISA: 'EASYPAISA',
};
