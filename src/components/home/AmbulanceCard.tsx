import { Pressable, View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { moderateScale } from 'react-native-size-matters';

export type AmbulanceType = {
  type: string;
  label: string;
  baseFare: number;
  perKm: number;
  image?: any;
};

type Props = {
  card: AmbulanceType;
  selected?: boolean;
  onPress?: () => void;
};

const AmbulanceCard: FC<Props> = ({ card, selected = false, onPress }) => {
  const styles = useGlobalStyles();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        globalStyles.row,
        globalStyles.alignCenter,
        globalStyles.paddingH15,
        globalStyles.mV5,
        styles.border,
        selected && styles.cardSelected,
        pressed && styles.cardpressed,
      ]}
    >
      {/* IMAGE */}
      <View style={globalStyles.size80}>
        <Image
          source={card.image}
          style={{
            width: moderateScale(80),
            height: moderateScale(80),
          }}
          resizeMode="contain"
        />
      </View>

      {/* TEXT */}
      <View style={[globalStyles.width80, globalStyles.mL10]}>
        <Text style={styles.h6}>{card.label}</Text>

        <Text style={styles.smallText}>
          Base: Rs {card.baseFare} • Per KM: Rs {card.perKm}
        </Text>
      </View>
    </Pressable>
  );
};
export default React.memo(AmbulanceCard);
