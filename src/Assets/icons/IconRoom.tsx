import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {}
function IconRoom(props: Props) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M3.57 12l8.93-5.953L21.43 12l-8.93 5.953L3.57 12z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconRoom;
