import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {}
function IconSave(props: Props) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 5.828V17h-2V5.828L7.757 9.071 6.343 7.657 12 2l5.657 5.657-1.414 1.414L13 5.828zM4 16h2v4h12v-4h2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.963-2-2v-4z"
        fill="#fff"
      />
    </Svg>
  );
}

export default IconSave;
