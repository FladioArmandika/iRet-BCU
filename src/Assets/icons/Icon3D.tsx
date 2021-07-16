import React from 'react';
import SVG, { ClipPath, Defs, G, Path } from 'react-native-svg';

function Icon3D() {
  return (
    <SVG width="33" height="33" fill="none" viewBox="0 0 33 33">
      <G clipPath="url(#clip0)">
        <Path
          fill="#fff"
          d="M6.868 11.768v9.275a1.504 1.504 0 00.75 1.3l8.032 4.637a1.505 1.505 0 001.5 0l8.032-4.638a1.505 1.505 0 00.75-1.299V11.77a1.504 1.504 0 00-.75-1.3L17.15 5.833a1.504 1.504 0 00-1.5 0L7.618 10.47a1.504 1.504 0 00-.75 1.298zm17.564.867v8.408l-7.2 4.158-.077-8.365 7.277-4.201zm-8.777 4.198l.077 8.462-7.364-4.252v-8.506l7.287 4.296zm.745-9.702l7.282 4.204-7.274 4.2-7.206-4.248L16.4 7.131z"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path
            fill="#fff"
            d="M0 0H24V24H0z"
            transform="rotate(60 10.392 18)"
          />
        </ClipPath>
      </Defs>
    </SVG>
  );
}

export default Icon3D;
