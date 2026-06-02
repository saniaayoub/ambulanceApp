import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import { LogoSvg } from '../assets/images/svgs';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import FooterLink from './FooterLink';

type Props = {
  children: React.ReactNode;
  text: string;
  handleNavigate: () => void;
  linkText1: string;
  linkText2: string;
  style?: Object;
};

const AuthWrapper = ({
  children,
  text,
  handleNavigate,
  linkText1,
  linkText2,
  style,
}: Props) => {
  const styles = useGlobalStyles();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        { flexGrow: 1 },
        globalStyles.paddingB40,
        styles.card,
      ]}
    >
      <View style={[globalStyles.flex, globalStyles.padding20, style]}>
        <View
          style={[
            styles.border,
            globalStyles.paddingH20,
            globalStyles.paddingV40,
          ]}
        >
          <View style={[globalStyles.mB40, globalStyles.centered]}>
            <View style={globalStyles.negmargin50}>
              <LogoSvg width={moderateScale(200)} height={verticalScale(100)} />
            </View>
            <Text style={[styles.h4,globalStyles.negmargin20]}>{text}</Text>
          </View>
          {children}
        </View>
      </View>
      <FooterLink
        handleNavigate={handleNavigate}
        text={linkText1}
        linkText={linkText2}
      />
    </ScrollView>
  );
};

export default AuthWrapper;
