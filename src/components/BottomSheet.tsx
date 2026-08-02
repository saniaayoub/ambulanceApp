import React from 'react';
import { Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';

type Props = {
  onOpened?: () => void;
  onClosed?: () => void;
  bottomSheetRef: any;
  children?: any;
  modalHeight: number;
  alwaysOpen?: number;
  panGestureEnabled?: boolean;
};

const BottomSheet = ({
  onOpened,
  onClosed,
  bottomSheetRef,
  modalHeight,
  panGestureEnabled = false,
  alwaysOpen,
  children,
}: Props) => {
  return (
    <Modalize
      onOpened={onOpened}
      onClosed={onClosed}
      ref={bottomSheetRef}
      modalHeight={modalHeight}
      alwaysOpen={alwaysOpen}
      panGestureEnabled={panGestureEnabled}
      // closeSnapPointStraightEnabled={false}
      closeOnOverlayTap={false}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled',
      }}
      // adjustToContentHeight
    >
      {children}
    </Modalize>
  );
};

export default BottomSheet;
