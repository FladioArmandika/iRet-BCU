import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props {}
function IconClose(props: Props) {
  return (
    <Svg width={24} height={24} fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 13.416l-6.437 6.437a.5.5 0 01-.708 0l-.708-.708a.5.5 0 010-.708L10.584 12 4.147 5.563a.5.5 0 010-.708l.708-.708a.5.5 0 01.708 0L12 10.584l6.437-6.437a.5.5 0 01.708 0l.708.708a.5.5 0 010 .708L13.416 12l6.437 6.437a.5.5 0 010 .708l-.708.708a.5.5 0 01-.708 0L12 13.416z'
        fill='#fff'
      />
    </Svg>
  );
}

export default IconClose;
