import React from 'react';
import { useAuthStore } from '../stores/authStore';
import DriverDrawer from './DriverDrawer';
import UserDrawer from './UserDrawer';
import { Roles } from '../utils/enums';

const RootNavigator = () => {
  const role = useAuthStore(state => state.role);
  console.log(role, 'role');

  if (role === Roles.DRIVER) {
    return <DriverDrawer />;
  }

  return <UserDrawer />;
};

export default RootNavigator;
