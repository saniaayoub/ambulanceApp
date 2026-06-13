import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import AppButton from '../../../../components/AppButton';
import PerformanceCard from '../../../../components/profile/PerformanceCard';
import PersonalInfo from '../../../../components/profile/PersonalInfo';
import ProfileHeader from '../../../../components/profile/ProfileHeader';
import SavedAddresses from '../../../../components/profile/SavedAddresses';
import SettingsSection from '../../../../components/profile/SettingsSection';
import VehicleCard from '../../../../components/profile/VehicleCard';
import { useAuthStore } from '../../../../stores/authStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import BackButton from '../../../../components/BackButton';
import { Roles } from '../../../../utils/enums';
import FormInput from '../../../../components/FormInput';
import { useForm } from 'react-hook-form';

const ProfileSettings = () => {
  const role = useAuthStore(state => state.role);
  const styles = useGlobalStyles();
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: 'Dr. Ashraf',
      email: 'dr.ashraf@example.com',
      phone: '+92 300 0000000',
    },
  });

  const onSave = (data: any) => {
    // TODO: call update profile API
    console.log('Saving profile:', data);
    setIsEditing(false);
  };

  return (
    <View style={[styles.card, globalStyles.flex]}>
      <BackButton title="Profile Settings" />
      <ScrollView contentContainerStyle={globalStyles.paddingH15}>
        <ProfileHeader name="Dr. Ashraf" phone="+92 300 0000000" />

        {isEditing ? (
          <View
            style={[
              styles.card,
              styles.border,
              globalStyles.padding10,
              globalStyles.mT10,
            ]}
          >
            <FormInput
              control={control}
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
            <FormInput
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <FormInput
              control={control}
              name="phone"
              label="Phone"
              placeholder="Enter your phone"
            />
            <AppButton
              title="Save Changes"
              onPress={handleSubmit(onSave)}
              variant="primary"
            />
          </View>
        ) : (
          <PersonalInfo
            name="Dr. Ashraf"
            email="dr.ashraf@example.com"
            phone="+92 300 0000000"
          />
        )}

        {!isEditing && (
          <AppButton
            title="Edit Profile"
            icon="account-edit-outline"
            onPress={() => setIsEditing(true)}
            size="sm"
            style={[globalStyles.mT10]}
          />
        )}

        {role === Roles.DRIVER && <VehicleCard />}
        {role === Roles.DRIVER && <PerformanceCard />}
        {role === Roles.USER && <SavedAddresses />}

        <SettingsSection />

        <View style={globalStyles.mT10}>
          <AppButton title="Logout" icon="logout" size="sm" />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSettings;
