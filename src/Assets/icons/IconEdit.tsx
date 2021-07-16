import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconEdit(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill='none'>
      <Path
        d='M16.474 5.408l2.118 2.117-2.118-2.117zm1.362-1.865L12.109 9.27a2.118 2.118 0 00-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.854 1.854 0 00-2.621-2.621v0z'
        stroke='#fff'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M19 15v3a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h3'
        stroke='#fff'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default IconEdit;
