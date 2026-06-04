import React, { type FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import { useGlobalStyles } from '../styles/globalStyles';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Props = {
  onOpenMenu?: () => void;
  locationLabel?: string;
};

const HomeHeader: FC<Props> = ({
  onOpenMenu,
  locationLabel = 'Sector 5, Lahore',
}) => {
  const styles = useGlobalStyles();

  return (
    <View style={styles.homeHeaderContainer}>
      <Pressable style={styles.homeMenuButton} onPress={onOpenMenu}>
        <MaterialIcons name={'menu' as IconName} size={24} color="#212121" />
      </Pressable>
      <View style={styles.homeHeaderContent}>
        <Text style={styles.homeUserName}>Dr. Ashraf</Text>
        <Pressable style={styles.homeLocationTab} onPress={() => {}}>
          <MaterialIcons
            name={'location-on' as IconName}
            size={18}
            color="#D32F2F"
          />
          <Text style={styles.homeLocationTabLabel}>{locationLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;
