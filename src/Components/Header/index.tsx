import React from 'react';
import { View } from 'react-native';
import { Label } from '@components/index';
import { css } from '@styles/index';

interface Props {}

const Header: React.FC<Props> = () => (
  <View style={css('items-center justify-center h-12 bg-gray-800')}>
    <Label style={css('text-lg text-white font-bold')}>IRET-BCU DEMO</Label>
  </View>
);

export default Header;
