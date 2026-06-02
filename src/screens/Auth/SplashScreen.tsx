import { type FC } from 'react';
import { Text, View } from 'react-native';
import LogoSvg from '../../assets/images/svgs/logo.svg';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const SplashScreen: FC = () => {
  const styles = useGlobalStyles();
  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.centered, globalStyles.mB20]}>
        <LogoSvg width={150} height={150} />
        <Text style={styles.h4}>Every Second Counts</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
