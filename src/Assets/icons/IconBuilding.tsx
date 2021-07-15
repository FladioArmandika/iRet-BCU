import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {}

function IconBuilding(props: Props) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.145.112A.75.75 0 0122.5.75v22.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75V21H15v2.25a.75.75 0 01-.75.75H.75a.75.75 0 01-.75-.75V15a.75.75 0 01.513-.711L9 11.459V6.75a.75.75 0 01.414-.67l12-6a.75.75 0 01.73.033zM9 13.041L1.5 15.54v6.96H9v-9.46zm1.5 9.459h3v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25h3V1.963l-10.5 5.25V22.5z"
        fill="#fff"
      />
      <Path
        d="M3 16.5h1.5V18H3v-1.5zm3 0h1.5V18H6v-1.5zm-3 3h1.5V21H3v-1.5zm3 0h1.5V21H6v-1.5zm6-6h1.5V15H12v-1.5zm3 0h1.5V15H15v-1.5zm-3 3h1.5V18H12v-1.5zm3 0h1.5V18H15v-1.5zm3-3h1.5V15H18v-1.5zm0 3h1.5V18H18v-1.5zm-6-6h1.5V12H12v-1.5zm3 0h1.5V12H15v-1.5zm3 0h1.5V12H18v-1.5zm-6-3h1.5V9H12V7.5zm3 0h1.5V9H15V7.5zm3 0h1.5V9H18V7.5zm0-3h1.5V6H18V4.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default IconBuilding;
