import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props {}

function IconMove(props: Props) {
  return (
    <Svg width={24} height={24} fill='none'>
      <Path
        d='M18 11h-5V6h3l-4-4-4 4h3v5H6V8l-4 4 4 4v-3h5v5H8l4 4 4-4h-3v-5h5v3l4-4-4-4v3z'
        fill='#fff'
      />
    </Svg>
  );
}

export default IconMove;
