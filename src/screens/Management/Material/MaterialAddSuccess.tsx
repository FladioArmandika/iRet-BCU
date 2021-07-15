import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { IconSuccess } from '@assets/icons';
import { css } from '@styles/index';

export default function MaterialAddSuccess() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Material');
    }, 2000);
  }, []);
  return (
    <View style={css('h-full w-full bg-gray-800 items-center justify-center')}>
      <IconSuccess />
      <Text style={css('text-white text-2xl font-bold px-10 text-center mt-4')}>
        CREATE MATERIAL SUCCESS
      </Text>
    </View>
  );
}
