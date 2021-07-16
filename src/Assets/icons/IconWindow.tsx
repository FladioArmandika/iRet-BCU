import * as React from 'react';
import SVG, { Path } from 'react-native-svg';

interface Props {}
function IconWindow(props: Props) {
  return (
    <SVG width={24} height={24} fill="none" {...props}>
      <Path
        d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 9h-7V4h7v7zm-9-7v7H4V4h7zm-7 9h7v7H4v-7zm9 7v-7h7v7h-7z"
        fill="#fff"
      />
    </SVG>
  );
}

export default IconWindow;
