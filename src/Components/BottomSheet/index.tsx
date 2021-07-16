import { css } from '@styles/index';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';

interface BottomSheetProps {
  children: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({ children }) => {
  return (
    <View style={css('flex-row items-center justify-start py-6 pl-4  bg-gray-800')}>
      {children}
    </View>
  );
};

export default BottomSheet;
