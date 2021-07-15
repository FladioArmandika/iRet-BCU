import { css } from '@styles/index';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';

interface BottomSheetProps {
  children: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({ children }) => {
  return (
    <View style={css('h-20 w-full px-4 flex-row items-center justify-between')}>
      {children}
    </View>
  );
};

export default BottomSheet;
