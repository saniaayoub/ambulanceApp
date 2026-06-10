import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { LogoSvg } from '../assets/images/svgs';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import FooterLink from './FooterLink';
import BackButton from './BackButton';

type Props = {
  children: React.ReactNode;
  text?: string;
  handleNavigate?: () => void;
  linkText1?: string;
  linkText2?: string;
  style?: Object;
  canGoBack?: boolean;
};

const AuthWrapper = ({
  children,
  text,
  handleNavigate,
  linkText1,
  linkText2,
  style,
  canGoBack = true,
}: Props) => {
  const styles = useGlobalStyles();
  return (
    <View style={[globalStyles.flex, styles.card]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          globalStyles.flexgrow,
          globalStyles.paddingB40,
          styles.card,
        ]}
      >
        {canGoBack && <BackButton />}

        <View style={[globalStyles.flex, globalStyles.padding20, style]}>
          <View
            style={[
              styles.border,
              globalStyles.paddingH20,
              globalStyles.paddingV20,
            ]}
          >
            <View style={[globalStyles.mB20, globalStyles.centered]}>
              <View style={[globalStyles.negmargin30]}>
                <LogoSvg
                  width={moderateScale(200)}
                  height={verticalScale(100)}
                />
              </View>
              <Text
                style={[
                  styles.h4,
                  globalStyles.textCenter,
                  globalStyles.negmargin30,
                ]}
              >
                {text}
              </Text>
            </View>
            {children}
          </View>
        </View>
        {linkText1 && linkText2 && handleNavigate && (
          <FooterLink
            handleNavigate={handleNavigate}
            text={linkText1}
            linkText={linkText2}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AuthWrapper;
