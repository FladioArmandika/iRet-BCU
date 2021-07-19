import React from 'react';
import { View } from 'react-native';
import { Label } from '@components/index';
import { css } from '@styles/index';

interface Props {
  children: any;
  title: any;
  // addRoom: any,
}

const Modal: React.FC<Props> = ({ children, title }) => (
  <View
    style={[
      css('absolute top-0 left-0 z-10 w-full h-full mt-12'),
      { backgroundColor: 'rgba(0,0,0,0.5)' },
    ]}>
    <View style={css('flex-1 items-center')}>
      <View style={css('w-5/6 mt-20 bg-white items-center rounded-lg')}>
        {title && (
          <View
            style={css(
              'w-full h-10 items-center justify-center bg-gray-200 rounded-t-lg'
            )}>
            <Label style={css('font-bold text-gray-800')}>{title}</Label>
          </View>
        )}
        <View style={css('w-full px-3 py-4')}>{children}</View>
      </View>
    </View>
  </View>
);
export default Modal;
