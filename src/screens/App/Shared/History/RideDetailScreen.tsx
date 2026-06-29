import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { VentilatorAmbulance } from '../../../../assets/images/pngs';
import AppButton from '../../../../components/AppButton';
import BackButton from '../../../../components/BackButton';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import DetailColumnComp from '../../../../components/booking/DetailColumnComp';
import { renderRow } from '../../../../components/booking/RideCompletedSheet';
import { useTrip } from '../../../../hooks/useRideHistory';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { ambulanceImages } from '../../../../utils/constants';
import { Roles } from '../../../../utils/enums';
import { formatTripDate } from '../../../../utils/functions';

type Props = {
  detail: any;
  role: Roles;
};

const RideDetailScreen = ({ detail, role }: Props) => {
  const styles = useGlobalStyles();

  const { data, isLoading } = detail;
  const { handleDeleteTrip } = useTrip();

  const trip = data?.data;

  if (isLoading) {
    return <FullScreenLoader loading />;
  }

  if (!trip) {
    return (
      <View style={[styles.card, globalStyles.flex]}>
        <BackButton title="Ride History Detail" />
        <View style={[globalStyles.flex, globalStyles.centered]}>
          <Text style={styles.smallText}>Trip not found.</Text>
        </View>
      </View>
    );
  }

  const personTitle = role === Roles.USER ? 'Driver' : 'Patient';

  const personValue =
    role === Roles.USER
      ? `${trip?.driver?.name ?? '-'}${
          trip?.driver?.rating ? ` (${trip.driver.rating}★)` : ''
        }`
      : trip?.passenger?.name ?? '-';

  return (
    <View style={[styles.card, globalStyles.flex]}>
      <BackButton title="Ride History Detail" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.padding15}
      >
        <View>
          {/* Header */}
          <View style={globalStyles.centered}>
            <View style={[globalStyles.centered, globalStyles.row]}>
              <Image
                source={ambulanceImages[trip?.ambulanceType]}
                resizeMode="contain"
                style={globalStyles.size100}
              />

              <Image
                source={VentilatorAmbulance}
                resizeMode="cover"
                style={[
                  globalStyles.size80,
                  styles.border,
                  styles.round,
                  globalStyles.mL10,
                ]}
              />
            </View>

            <Text
              style={[styles.h5, globalStyles.textCenter, globalStyles.mT10]}
            >
              {trip?.ambulanceType} • {trip?.vehicle?.number ?? '-'}
            </Text>

            <Text
              style={[
                styles.smallText,
                {
                  color:
                    trip?.status === 'COMPLETED'
                      ? 'green'
                      : trip?.status === 'CANCELLED'
                      ? 'red'
                      : '#F5A623',
                },
              ]}
            >
              {trip?.status}
            </Text>
          </View>

          {/* Pickup / Destination */}
          <DetailColumnComp
            title1="Pickup"
            title2="Destination"
            text1={trip?.pickupLocation?.address ?? '-'}
            text2={trip?.destination?.address ?? '-'}
            style={[globalStyles.mT15, styles.lightGreyCard]}
          />

          <Text style={[styles.h5, globalStyles.mT20, globalStyles.mB15]}>
            Trip Details
          </Text>

          {renderRow(personTitle, personValue, styles)}

          <View style={styles.separator} />

          {renderRow('Date', formatTripDate(trip?.createdAt), styles)}

          <View style={styles.separator} />

          {renderRow(
            'Distance',
            `${trip?.tripInfo?.distanceKm ?? 0} km`,
            styles,
          )}

          <View style={styles.separator} />

          {renderRow(
            'Duration',
            `${trip?.tripInfo?.tripDuration ?? 0} min`,
            styles,
          )}

          <View style={styles.separator} />

          {renderRow(
            'Payment Method',
            trip?.fare?.paymentMethod ?? '-',
            styles,
          )}

          <View style={styles.separator} />

          {renderRow(
            'Payment Status',
            trip?.fare?.paymentStatus ?? '-',
            styles,
          )}

          <View style={styles.separator} />

          {renderRow(
            'Total Fare',
            `PKR ${(trip?.fare?.total ?? 0).toLocaleString()}`,
            styles,
          )}
        </View>

        {/* Delete button only for user */}
        {role === Roles.USER && (
          <AppButton
            title="Delete Record"
            onPress={() => handleDeleteTrip(trip._id)}
            style={globalStyles.mT20}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(RideDetailScreen);
