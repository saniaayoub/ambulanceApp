import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { User } from '../../assets/images/pngs';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { openCamera, openGallery } from '../../utils/functions'; // <-- your utils

interface Props {
  name: string;
  image?: any;
  uploadImage: (image: any) => void;
}

const ProfileHeader = ({ name, image, uploadImage }: Props) => {
  const styles = useGlobalStyles();

  const onPressCamera = () => {
    console.log('jo');
    Alert.alert(
      'Profile Photo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            try {
              const selectedImage = await openCamera();

              if (selectedImage) {
                uploadImage(selectedImage);
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            try {
              const selectedImage = await openGallery();

              if (selectedImage) {
                uploadImage(selectedImage);
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View
      style={[
        styles.card,
        styles.border,
        globalStyles.padding10,
        globalStyles.alignCenter,
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPressCamera}>
        <Image
          source={
            image?.uri ? { uri: image.uri } : image ? { uri: image } : User
          }
          style={localStyles.avatar}
        />

        <View style={localStyles.editIcon}>
          <MaterialDesignIcons
            name="camera"
            size={moderateScale(18)}
            color={theme.colors.common.white}
          />
        </View>
      </TouchableOpacity>

      <Text style={[styles.h4, globalStyles.mT10]}>{name}</Text>
    </View>
  );
};

export default ProfileHeader;

const localStyles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#E53935',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
