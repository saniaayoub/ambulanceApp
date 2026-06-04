import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import React, { type FC } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  DeadBodyAmbulance,
  NormalAmbulance,
  VentilatorAmbulance,
} from '../../../assets/images/pngs';
import AmbulanceCard from '../../../components/home/AmbulanceCard';
import HomeHeader from '../../../components/home/header';
import { globalStyles, useGlobalStyles } from '../../../styles/globalStyles';

const ambulanceCards = [
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

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <HomeHeader onOpenMenu={openDrawer} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeBanner}>
          <Text style={styles.homeBannerText}>Emergency medical transport</Text>
          <Text style={styles.homeBannerSubtext}>
            Book a premium ambulance with trained staff and real-time support.
          </Text>
          <Pressable style={styles.homeBannerCTA} onPress={() => {}}>
            <Text style={styles.homeBannerCTAText}>Emergency SOS</Text>
          </Pressable>
        </View>

        <View style={styles.homeSectionHeader}>
          <Text style={styles.homeSectionTitle}>Ambulance types</Text>
          {/* <Text style={styles.homeSectionAction}>View all</Text> */}
        </View>

        {ambulanceCards.map(card => (
          <AmbulanceCard card={card} key={card.title} />
        ))}

        <Pressable style={styles.homePrimaryButton} onPress={() => {}}>
          <Text style={styles.homePrimaryButtonText}>Request Ambulance</Text>
        </Pressable>

        <View style={styles.homeSectionHeader}>
          <Text style={styles.homeSectionTitle}>Nearby hospitals</Text>
          <Text style={styles.homeSectionAction}>See map</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.homeHospitalScroll}
        >
          {hospitals.map(hospital => (
            <View
              key={hospital.name}
              style={[styles.homeHospitalCard, styles.homeHospitalCardSpacing]}
            >
              <Text style={styles.homeHospitalName}>{hospital.name}</Text>
              <Text style={styles.homeHospitalDistance}>
                {hospital.distance}
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      {/* 
      <View style={styles.homeFabContainer}>
        <Pressable
          style={[styles.homeFabButton, styles.homeFabHelpline]}
          onPress={() => {}}
          accessibilityLabel="Call Helpline"
        >
          <MaterialIcons name={'phone'} size={24} color={'#FFFFFF'} />
        </Pressable>
        <Pressable
          style={[styles.homeFabButton, styles.homeFabSos]}
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
