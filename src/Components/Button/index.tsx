import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Label } from '@components/index';
import { css, getColor } from '@styles/index';

interface Props {
  onPress: any;
  pressed?: any;
  disabled?: any;
  bgColor?: any;
  textColor?: any;
  borderColor?: any;
  style?: any;
  text: string;
}

const Button: React.FC<Props> = ({
  onPress,
  pressed,
  disabled,
  bgColor,
  textColor,
  borderColor,
  style,
  text,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    bgColor: bgColor || getColor('gray-800'),
    textColor: textColor || getColor('white'),
    borderColor: borderColor || getColor('gray-800'),
  });

  return (
    <View style={css('flex-1')}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          css('w-full items-center px-4 py-3 rounded-lg border'),
          {
            backgroundColor: disabled ? getColor('gray-400') : state.bgColor,
            borderColor: disabled ? getColor('gray-400') : state.borderColor,
          },
          {
            backgroundColor: pressed ? getColor('gray-400') : state.bgColor,
            borderColor: pressed ? getColor('gray-400') : state.borderColor,
          },
          style,
        ]}
      >
        <Label style={[css('font-medium'), { color: state.textColor }]}>
          {text}
        </Label>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
