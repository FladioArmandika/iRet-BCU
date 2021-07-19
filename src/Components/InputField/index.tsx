import React from 'react';
import { KeyboardType, TextInput, ViewStyle, StyleProp} from 'react-native';
import { css } from '@styles/index';

interface Props {
  keyboardType?: KeyboardType;
  placeholder: string;
  value: any;
  style?: StyleProp<ViewStyle>;
  onChange(e: any): void;
}

const InputField: React.FC<Props> = ({
  keyboardType,
  placeholder,
  value,
  style,
  onChange,
}) => (
  <TextInput
    keyboardType={keyboardType || 'default'}
    placeholder={placeholder}
    value={value}
    onChangeText={onChange}
    style={[
      style,
      css('w-full h-10 my-1 px-4 text-gray-600 border border-gray-300 rounded'),
    ]}
    // {...this.props}
  />
);

export default InputField;
