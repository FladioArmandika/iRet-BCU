import React, { memo } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

// Styles
import styles from './Styles/FloorStyles'
import { apply } from '../styles/OsmiProvider'

const FloorComponent = props => {
  const { isActive, data, onClick } = props

  /**
   * Function to get active button style
   * @returns Style
   * @private
   */
  const _getActiveStyle = () => {
    return isActive && apply(`bg-${data?.floorColor} border-${data?.floorColor}`)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onClick(data)}
      style={[
        styles.button,
        _getActiveStyle()
      ]}
    >
      <Text style={[styles.label, isActive && styles.labelActive]}>{data?.floorName}</Text>
    </TouchableOpacity>
  )
}

export default memo(FloorComponent)
