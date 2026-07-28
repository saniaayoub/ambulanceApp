import React from 'react';
import { Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';

const BottomSheet = ({ children, bottomSheetRef, height }: any) => {
  return (
    <Modalize
      ref={bottomSheetRef}
      modalHeight={height}
      keyboardAvoidingBehavior={
        Platform.OS === 'android' ? 'height' : 'padding'
      }
      panGestureEnabled={false}
      closeOnOverlayTap={false}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled',
      }}
    >
      {children}
    </Modalize>
  );
};

export default BottomSheet;
