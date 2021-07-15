import React, { ReactNode } from 'react';
import { Text } from 'react-native';

interface Props {
  style: any;
  children: ReactNode;
}

const Label: React.FC<Props> = ({ style, children }) => (
  <Text style={style}>{children}</Text>
);

export default Label;
