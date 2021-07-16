import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { IconSuccess } from '@assets/icons';
import { css } from '@styles/index';

export default function ConstructionAddSuccess() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Construction');
    }, 2000);
  }, []);
  return (
    <View style={css('h-full w-full bg-gray-800 items-center justify-center')}>
      <IconSuccess />
      <Text style={css('text-white text-2xl font-bold px-10 text-center mt-4')}>
        CREATE CONSTRUCTION SUCCESS
      </Text>
    </View>
  );
}
