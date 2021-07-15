import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {}
function IconSuccess(props: Props) {
  return (
    <Svg width={36} height={36} fill="none" {...props}>
      <Path
        d="M18 2a16 16 0 100 32 16 16 0 000-32zm10.45 10.63L15.31 25.76 7.55 18a1.414 1.414 0 112-2l5.78 5.78 11.14-11.13a1.415 1.415 0 112 2l-.02-.02z"
        fill="#fff"
      />
    </Svg>
  );
}

export default IconSuccess;
