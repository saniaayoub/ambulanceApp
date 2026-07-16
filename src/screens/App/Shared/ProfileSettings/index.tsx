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
import { useDriver } from '../../../../hooks/useDriver';
import { useProfile } from '../../../../hooks/useProfile';

const ProfileSettings = () => {
  const userData = useAuthStore(state => state.userData);
  const { data, isLoading } = useDriver(userData?.driverId);
  const { updateDriverProfile } = useProfile();

  const role = useAuthStore(state => state.role);
  const styles = useGlobalStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState({ uri: '', fileName: '', type: '' });

  const {
    control,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      name: userData?.fullName,
      email: userData?.email ?? data?.email,
      phone: userData?.phone,
    },
  });

  const uploadImage = async image => {
    setImage(image);
    const formData = new FormData();

    formData.append('image', {
      uri: image.uri,
      name: image.fileName || 'profile.jpg',
      type: image.type || 'image/jpeg',
    });

    await updateDriverProfile(formData);
  };
  const onSave = async (values: any) => {
    const hasImageChanged = !!image.uri;

    if (!isDirty && !hasImageChanged) {
      setIsEditing(false); // optional
      return;
    }
    console.log(isDirty, hasImageChanged, 'k');
    const formData = new FormData();

    if (dirtyFields.name) {
      formData.append('fullName', values.name);
    }

    if (dirtyFields.email) {
      formData.append('email', values.email);
    }

    // formData.append('address', values.address);

    // formData.append('emergencyContactName', values.emergencyContactName);

    // formData.append('emergencyContactPhone', values.emergencyContactPhone);

    // formData.append(
    //   'emergencyContactRelationship',
    //   values.emergencyContactRelationship,
    // );
    if (hasImageChanged) {
      formData.append('image', {
        uri: image.uri,
        name: image.fileName || 'profile.jpg',
        type: image.type || 'image/jpeg',
      });
    }

    await updateDriverProfile(formData);
    setIsEditing(false);
  };

  console.log(image, 'ima');
  return (
    <View style={[styles.card, globalStyles.flex]}>
      <BackButton title="Profile Settings" />
      <ScrollView contentContainerStyle={globalStyles.paddingH15}>
        <ProfileHeader
          name={data?.fullName || userData?.fullName}
          image={data?.image || image?.uri}
          uploadImage={uploadImage}
        />

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
            {/* <FormInput
              control={control}
              name="phone"
              label="Phone"
              placeholder="Enter your phone"
              disabled
            /> */}
            <AppButton
              title="Save Changes"
              onPress={handleSubmit(onSave)}
              variant="primary"
            />
          </View>
        ) : (
          <PersonalInfo
            name={data?.fullName || userData?.fullName}
            email={data?.email || userData?.email}
            phone={data?.phone || userData?.phone}
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

        {role === Roles.DRIVER && (
          <VehicleCard
            type={data?.ambulanceType}
            model={data?.model}
            vehicleNumber={data?.vehicleNumber}
          />
        )}
        {role === Roles.DRIVER && (
          <PerformanceCard rating={data?.rating} tripCount={data?.tripCount} />
        )}
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
