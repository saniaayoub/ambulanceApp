import { Pressable, View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { moderateScale } from 'react-native-size-matters';

type Props = {
  card: {
    title: string;
    subtitle: string;
    image: any;
  };
  selected?: boolean;
  onPress?: () => void;
};
const AmbulanceCard: FC<Props> = ({
  card,
  selected = false,
  onPress,
}: Props) => {
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
        selected && styles.ambulanceCardSelected,
        pressed && styles.ambulanceCardPressed,
      ]}
    >
      <View style={[{ width: moderateScale(80), height: moderateScale(80) }]}>
        <Image
          source={card.image}
          style={[{ width: moderateScale(80), height: moderateScale(80) }]}
          resizeMode="contain"
        />
      </View>

      <View style={[globalStyles.width80, globalStyles.mL10]}>
        <Text style={styles.h6}>{card.title}</Text>
        <Text style={styles.smallText}>{card.subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(AmbulanceCard);
