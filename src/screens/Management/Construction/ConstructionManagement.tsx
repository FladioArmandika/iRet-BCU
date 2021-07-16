/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { css, getColor } from '@styles/index';
import { Construction } from '@type/index';
import { IconConstructWall } from '@assets/icons';
import { Button } from '@components/index';
import { rootState } from '@stores/CreateStore';

export default function ConstructionContainer() {
  const navigation = useNavigation();
  const app = useSelector((state: rootState) => state.app);
  const [listConstruction, setListConstruction] = useState<Construction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('wall');

  useEffect(() => {
    changeListConstruction('wall');
  }, []);

  const goToMaterialScreen = () => {
    navigation.navigate('Material');
  };

  const goToConstructionFormScreen = () => {
    navigation.navigate('ConstructionAdd');
  };

  const changeListConstruction = (category: string) => {
    setSelectedCategory(category);
    switch (category) {
      case 'wall':
        setListConstruction(app.construction); // NEED TO CHANGE THIS
        break;
      case 'floor':
        setListConstruction(app.construction); // NEED TO CHANGE THIS
        break;
      case 'roof':
        setListConstruction(app.construction); // NEED TO CHANGE THIS
        break;
      default:
        break;
    }
  };

  const renderConstructionView = (
    construction: Construction,
    index: number,
  ) => (
    <View
      style={css('w-full px-4 py-6 bg-white rounded-lg w-full pt-6 mb-4')}
      key={index}
    >
      <View style={css('flex flex-row justify-between w-full')}>
        <View style={css('w-1/3 justify-between')}>
          <IconConstructWall />
        </View>
        <View style={css('w-2/3')}>
          <View style={css('')}>
            <View style={css('flex flex-row justify-between')}>
              <View>
                <Text>Name</Text>
                <Text style={css('font-bold mt-2')}>{construction.name}</Text>
              </View>
            </View>
          </View>
          <View style={css('mt-4 w-full')}>
            <View style={css('flex flex-row justify-between w-full')}>
              <View>
                <Text>Materials</Text>
                <View style={css('flex flex-row w-full  mt-2 ')}>
                  {construction.material.map((material, indexMaterial) => (
                    <Text
                      style={css(
                        'font-bold mr-4 bg-gray-200 rounded px-2 py-2',
                      )}
                      key={indexMaterial}
                    >
                      {material}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={css('h-full px-4 pt-20')}>
      <View
        style={css(
          'w-full h-12 flex flex-row items-center justify-between mt-4 ',
        )}
      >
        <View>
          <Text style={css('font-bold text-3xl text-center')}>
            Construction
          </Text>
        </View>
        <View>
          <Button
            style={{ width: 100 }}
            text="Material"
            onPress={goToMaterialScreen}
          />
        </View>
      </View>
      <View style={css('w-full h-12 flex flex-row items-center mt-2 mb-4')}>
        <View style={css('')}>
          <Button
            text="Wall"
            style={{ width: 80, marginRight: 20 }}
            pressed={selectedCategory === 'wall'}
            onPress={() => changeListConstruction('wall')}
          />
        </View>
        <View style={css(' ')}>
          <Button
            text="Floor"
            style={{ width: 80, marginRight: 20 }}
            pressed={selectedCategory === 'floor'}
            onPress={() => changeListConstruction('floor')}
          />
        </View>
        <View style={css(' ')}>
          <Button
            text="Roof"
            style={{ width: 80, marginRight: 20 }}
            pressed={selectedCategory === 'roof'}
            onPress={() => changeListConstruction('roof')}
          />
        </View>
      </View>
      <ScrollView>
        {listConstruction.map((construction, index) =>
          renderConstructionView(construction, index),
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => goToConstructionFormScreen()}
        style={[
          css('items-center px-4 py-4 rounded-full border'),
          {
            backgroundColor: getColor('gray-800'),
            borderColor: getColor('gray-800'),
            position: 'absolute',
            width: 60,
            right: 20,
            bottom: 50,
          },
        ]}
      >
        <Text style={css('text-white text-lg')}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
