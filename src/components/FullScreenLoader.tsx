import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
// import { useLoaderStore } from '../stores/loaderStore';
import { useThemedStyles } from '../styles/createThemedStyles';

const FullScreenLoader = ({ loading }: { loading: boolean }) => {
  // const { isLoading } = useLoaderStore();
  const styles = useStyles();
  if (!loading) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={loading}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={styles.spinner.color} />
          <Text style={styles.text}>Please wait...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default FullScreenLoader;

const useStyles = () =>
  useThemedStyles(({ colors, typography }) => ({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '80%',
      padding: moderateScale(24),
      backgroundColor: colors.background,
      borderRadius: moderateScale(16),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 10,
    },
    text: {
      ...typography.body,
      color: colors.text,
      marginTop: moderateScale(16),
      textAlign: 'center',
    },
    spinner: {
      color: colors.primary,
    },
  }));
