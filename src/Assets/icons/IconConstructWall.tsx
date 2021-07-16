import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface Props {}

function IconConstructWall(props: Props) {
  return (
    <Svg width={64} height={64} fill="none" {...props}>
      <Path d="M2 2h60v60H2V2z" fill="#FFD3C2" />
      <Path d="M2.135 10.685H8.91v7.245H2.135v-7.245z" fill="#B34A30" />
      <Path d="M2.135 19.24H19.14v7.245H2.135V19.24z" fill="#D56437" />
      <Path d="M2.135 28.46H8.91v7.245H2.135V28.46z" fill="#C74122" />
      <Path
        d="M2.135 37.1H19.14v7.245H2.135V37.1z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M2.135 45.96h8.275v7.245H2.135V45.96zM2.135 54.825h19.28v7.245H2.135v-7.245z"
        fill="#D56437"
      />
      <Path d="M22.915 54.825h19.28v7.245h-19.28v-7.245z" fill="#B53E26" />
      <Path d="M43.835 54.825H62v7.245H43.835v-7.245z" fill="#D56437" />
      <Path d="M11.91 45.96h19.005v7.245H11.91V45.96z" fill="#E96E49" />
      <Path
        d="M32.415 45.96H49.92v7.245H32.415V45.96z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path d="M51.425 45.96h10.58v7.245h-10.58V45.96z" fill="#C6481B" />
      <Path d="M20.64 37.1H40v7.245H20.64V37.1z" fill="#D56437" />
      <Path d="M41.5 37.1H62v7.245H41.5V37.1z" fill="#BF471B" />
      <Path d="M2.135 2H19.14v7.245H2.135V2z" fill="#B65324" />
      <Path d="M20.64 2H40v7.245H20.64V2z" fill="url(#prefix__paint2_linear)" />
      <Path d="M41.5 2H62v7.245H41.5V2z" fill="url(#prefix__paint3_linear)" />
      <Path d="M10.41 28.46h18.595v7.245H10.41V28.46z" fill="#D56437" />
      <Path
        d="M30.505 28.46H50v7.245H30.505V28.46z"
        fill="url(#prefix__paint4_linear)"
      />
      <Path
        d="M51.5 28.46H62v7.245H51.5V28.46zM20.64 19.24H40v7.245H20.64V19.24zM41.5 19.24H62v7.245H41.5V19.24z"
        fill="#D56437"
      />
      <Path
        d="M10.41 10.685h19.005v7.245H10.41v-7.245z"
        fill="url(#prefix__paint5_linear)"
      />
      <Path d="M30.915 10.685H49.92v7.245H30.915v-7.245z" fill="#AC391F" />
      <Path d="M51.42 10.685H62v7.245H51.42v-7.245z" fill="#D56437" />
      <Path
        opacity={0.2}
        d="M60.5 3.5v57h-57v-57h57zM62 2H2v60h60V2z"
        fill="#424242"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={10.636}
          y1={35.875}
          x2={10.636}
          y2={47.381}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.001} stopColor="#B4391F" />
          <Stop offset={0.292} stopColor="#AC391F" />
          <Stop offset={0.737} stopColor="#97391F" />
          <Stop offset={1} stopColor="#87391F" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={41.169}
          y1={44.25}
          x2={41.169}
          y2={54.52}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D56437" />
          <Stop offset={0.32} stopColor="#D26035" />
          <Stop offset={0.608} stopColor="#C7552F" />
          <Stop offset={0.884} stopColor="#B64325" />
          <Stop offset={1} stopColor="#AC391F" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={30.319}
          y1={1.917}
          x2={30.319}
          y2={11.024}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D56437" />
          <Stop offset={0.32} stopColor="#D26035" />
          <Stop offset={0.608} stopColor="#C7552F" />
          <Stop offset={0.884} stopColor="#B64325" />
          <Stop offset={1} stopColor="#AC391F" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={51.75}
          y1={-2.25}
          x2={51.75}
          y2={14.133}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D56437" />
          <Stop offset={0.32} stopColor="#D26035" />
          <Stop offset={0.608} stopColor="#C7552F" />
          <Stop offset={0.884} stopColor="#B64325" />
          <Stop offset={1} stopColor="#AC391F" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={40.253}
          y1={26.5}
          x2={40.253}
          y2={40.889}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.001} stopColor="#B4391F" />
          <Stop offset={0.292} stopColor="#AC391F" />
          <Stop offset={0.737} stopColor="#97391F" />
          <Stop offset={1} stopColor="#87391F" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={19.913}
          y1={10}
          x2={19.913}
          y2={19.895}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D56437" />
          <Stop offset={0.32} stopColor="#D26035" />
          <Stop offset={0.608} stopColor="#C7552F" />
          <Stop offset={0.884} stopColor="#B64325" />
          <Stop offset={1} stopColor="#AC391F" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default IconConstructWall;
