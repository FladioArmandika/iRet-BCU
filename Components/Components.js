import * as React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from '../styles/styles';
import { apply } from "../styles/OsmiProvider";

export function Container({children}) {
  //Container
}

export function Button(props) {
  const { type, btnStyle, text, disabled } = props
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.btn(type),
        btnStyle
      ]}
    >
      <Text style={[
        styles.btntext,
        disabled && apply('text-gray-500')
      ]}>{text}</Text>
    </TouchableOpacity>
  )
}

export function Input(props) {
  //For InputText Component
}

export function Modal(props) {
  //for Modal Component
}

