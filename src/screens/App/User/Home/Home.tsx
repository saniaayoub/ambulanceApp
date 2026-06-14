import React, { useEffect, type FC } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import {
  DeadBodyAmbulance,
  NormalAmbulance,
  VentilatorAmbulance,
} from '../../../../assets/images/pngs';
import AppButton from '../../../../components/AppButton';
import AmbulanceCard from '../../../../components/home/AmbulanceCard';
import HomeHeader from '../../../../components/home/header';
import { useLocation } from '../../../../hooks/useLocation';
import { useAuthStore } from '../../../../stores/authStore';
import {
  useBookingStore,
  type AmbulanceType,
} from '../../../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';

export const ambulanceCards = [
  {
    title: 'Normal Ambulance',
    subtitle: 'Basic transport with trained EMTs',
    image: NormalAmbulance,
    color: '#D32F2F',
  },
  {
    title: 'Ventilator Ambulance',
    subtitle: 'Advanced support for critical patients',
    image: VentilatorAmbulance,
    color: '#0D47A1',
  },
  {
    title: 'Dead Body Ambulance',
    subtitle: 'Respectful transport service',
    image: DeadBodyAmbulance,
    color: '#546E7A',
  },
];

const hospitals = [
  { name: 'City General Hospital', distance: '1.2 km' },
  { name: 'Al-Noor Medical Center', distance: '2.4 km' },
  { name: 'Carewell Trauma Unit', distance: '3.8 km' },
];

const Home: FC = ({ navigation }: any) => {
  const styles = useGlobalStyles();
  const { selectedAmbulance, setSelectedAmbulance, startBooking } =
    useBookingStore();
  const { userData } = useAuthStore();
  const { fetchLocation, currentLocation } = useLocation();

  useEffect(() => {
    if (currentLocation) {
      fetchLocation();
    }
  }, []);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleRequestAmbulance = () => {
    startBooking();
    navigation.navigate('BookingScreen');
  };
  const handleLocationSelect = () => {
    navigation.navigate('LocationScreen', { mode: 'currentLoc' });
  };

  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <HomeHeader
        onOpenMenu={openDrawer}
        name={userData?.fullName}
        locationLabel={currentLocation?.name}
        handleLocationPress={handleLocationSelect}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={[styles.h4, styles.white, globalStyles.mB10]}>
            Emergency medical transport
          </Text>
          <Text style={[[styles.lightText, styles.white, globalStyles.mB10]]}>
            Book a premium ambulance with trained staff and real-time support.
          </Text>
          <Pressable style={styles.bannerbutton} onPress={() => {}}>
            <Text style={styles.h5}>Emergency SOS</Text>
          </Pressable>
        </View>

        <View style={[globalStyles.mV10]}>
          <Text style={styles.h4}>Ambulance types</Text>
          {/* <Text style={styles.homeSectionAction}>View all</Text> */}
        </View>

        {ambulanceCards.map(card => (
          <AmbulanceCard
            card={card}
            key={card.title}
            selected={card.title === selectedAmbulance}
            onPress={() => setSelectedAmbulance(card.title as AmbulanceType)}
          />
        ))}

        <AppButton title="Request Ambulance" onPress={handleRequestAmbulance} />
        <View
          style={[
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.justifyBetween,
            globalStyles.mB10,
          ]}
        >
          <Text style={styles.h5}>Nearby hospitals</Text>
          <Text style={[styles.h6, styles.link]}>See All</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={globalStyles.mB20}
        >
          {hospitals.map(hospital => (
            <View
              key={hospital.name}
              style={[
                styles.border,
                globalStyles.padding10,
                { minWidth: moderateScale(160) },
                globalStyles.mR10,
              ]}
            >
              <Text style={styles.h5}>{hospital.name}</Text>
              <Text style={styles.text}>{hospital.distance}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      {/* 
      <View style={styles.fabContainer}>
        <Pressable
          style={[styles.fabButton, styles.link]}
          onPress={() => {}}
          accessibilityLabel="Call Helpline"
        >
          <MaterialIcons name={'phone'} size={24} color={'#FFFFFF'} />
        </Pressable>
        <Pressable
          style={[styles.fabButton, styles.link]}
          onPress={() => {}}
          accessibilityLabel="SOS"
        >
          <Text style={[styles.text, { color: theme.colors.common.white }]}>
            SOS
          </Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default Home;
