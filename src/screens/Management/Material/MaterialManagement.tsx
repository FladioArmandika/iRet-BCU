/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { IconMaterialBrick, IconMaterialBrickWhite } from '@assets/icons';
import { Button } from '@components/index';
import { rootState } from '@stores/createStore';
import { css, getColor } from '@styles/index';
import { Material, MaterialMass, MaterialNoMass } from '@type/index';

export default function MaterialContainer() {
  const app = useSelector((state: rootState) => state.app);
  const navigation = useNavigation();
  const [listMaterial, setListMaterial] = useState<Material[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('wall');

  useEffect(() => {
    changeListMaterial('wall');
  }, []);

  const renderMaterialImage = (image: string) => {
    switch (image) {
      case 'brick-default':
        return <IconMaterialBrick />;
      case 'brick-white':
        return <IconMaterialBrickWhite />;
      default:
        return <IconMaterialBrick />;
    }
  };

  const goToMaterialFormScreen = () => {
    navigation.navigate('MaterialAdd');
  };

  const renderMaterialMassView = (material: MaterialMass, index: number) => (
    <View style={css('w-full px-4 py-4 bg-white mt-4 rounded-lg')} key={index}>
      <View style={css('flex flex-row mt-2 justify-between')}>
        <View style={css('w-1/3 justify-between')}>
          {renderMaterialImage(material.image)}
          <View>
            <Text>{material.name}</Text>
            <Text style={css('font-bold')}>{material.roughness}</Text>
          </View>
        </View>
        <View style={css('w-2/3')}>
          <View>
            <View style={css('flex flex-row justify-between')}>
              <View style={css('w-1/2')}>
                <Text>Specific Heat</Text>
                <Text style={css('font-bold')}>{material.specificHeat}</Text>
              </View>
              <View style={css('w-1/2')}>
                <Text>Thermal Absorptance</Text>
                <Text style={css('font-bold')}>
                  {material.thermalAbsorptance}
                </Text>
              </View>
            </View>
          </View>
          <View style={css('mt-6')}>
            <View style={css('flex flex-row justify-between')}>
              <View style={css('w-1/2')}>
                <Text>Solar Absorptance</Text>
                <Text style={css('font-bold')}>
                  {material.solarAbsorptance}
                </Text>
              </View>
              <View style={css('w-1/2')}>
                <Text>Visible Absorptance</Text>
                <Text style={css('font-bold')}>
                  {material.visibleAbsorptance}
                </Text>
              </View>
            </View>
          </View>
          {selectedCategory === 'floor' ? (
            <View style={css('mt-6')}>
              <View style={css('flex flex-row justify-between')}>
                <View style={css('w-1/2')}>
                  <Text>Conductivity</Text>
                  <Text style={css('font-bold')}>{material.conductivity}</Text>
                </View>
                <View style={css('w-1/2')}>
                  <Text>Density</Text>
                  <Text style={css('font-bold')}>{material.density}</Text>
                </View>
              </View>
              <View style={css('mt-6')}>
                <Text>Thickness</Text>
                <Text style={css('font-bold')}>{material.thickness}</Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );

  const renderMaterialNoMassView = (
    material: MaterialNoMass,
    index: number,
  ) => (
    <View style={css('w-full px-4 py-4 bg-white mt-4 rounded-lg')} key={index}>
      <View style={css('flex flex-row mt-2 justify-between')}>
        <View style={css('w-1/3 justify-between')}>
          {renderMaterialImage(material.image)}
          <View>
            <Text>{material.name}</Text>
            <Text style={css('font-bold')}>{material.roughness}</Text>
          </View>
        </View>
        <View style={css('w-2/3')}>
          <View>
            <View style={css('flex flex-row justify-between')}>
              <View style={css('w-1/2')}>
                <Text>Thermal Resistance</Text>
                <Text style={css('font-bold')}>
                  {material.thermalResistance}
                </Text>
              </View>
              <View style={css('w-1/2')}>
                <Text>Thermal Absorptance</Text>
                <Text style={css('font-bold')}>
                  {material.thermalAbsorptance}
                </Text>
              </View>
            </View>
          </View>
          <View style={css('mt-6')}>
            <View style={css('flex flex-row justify-between')}>
              <View style={css('w-1/2')}>
                <Text>Solar Absorptance</Text>
                <Text style={css('font-bold')}>
                  {material.solarAbsorptance}
                </Text>
              </View>
              <View style={css('w-1/2')}>
                <Text>Visible Absorptance</Text>
                <Text style={css('font-bold')}>
                  {material.visibleAbsorptance}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const changeListMaterial = (category: string) => {
    setSelectedCategory(category);
    switch (category) {
      case 'mass':
        setListMaterial(app.materials.mass); // NEED TO CHANGE THIS
        break;
      case 'noMass':
        setListMaterial(app.materials.noMass); // NEED TO CHANGE THIS
        break;
      case 'airGap':
        setListMaterial(app.materials.airGap); // NEED TO CHANGE THIS
        break;
      case 'windowGlazing':
        setListMaterial(app.materials.windowGlazing); // NEED TO CHANGE THIS
        break;
      case 'windowGas':
        setListMaterial(app.materials.windowGas); // NEED TO CHANGE THIS
        break;
      default:
        break;
    }
  };

  return (
    <View style={css('h-full px-4 pt-20')}>
      <Text style={css('font-bold text-xl text-center')}>Material</Text>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={css('h-12 items-center mt-4 mb-2')}
        >
          <View>
            <Button
              text="Mass"
              style={{ width: 100, marginRight: 10 }}
              pressed={selectedCategory === 'mass'}
              onPress={() => changeListMaterial('mass')}
            />
          </View>
          <View>
            <Button
              text="No Mass"
              style={{ width: 100, marginRight: 10 }}
              pressed={selectedCategory === 'noMass'}
              onPress={() => changeListMaterial('noMass')}
            />
          </View>
          <View>
            <Button
              text="Air Gap"
              style={{ width: 100, marginRight: 10 }}
              pressed={selectedCategory === 'airGap'}
              onPress={() => changeListMaterial('airGap')}
            />
          </View>
          <View>
            <Button
              text="Window Glazing"
              style={{ width: 100, marginRight: 10 }}
              pressed={selectedCategory === 'windowGlazing'}
              onPress={() => changeListMaterial('windowGlazing')}
            />
          </View>
          <View>
            <Button
              text="Window Gas"
              style={{ width: 100, marginRight: 10 }}
              pressed={selectedCategory === 'windowGas'}
              onPress={() => changeListMaterial('windowGas')}
            />
          </View>
        </ScrollView>
      </View>
      <ScrollView>
        {listMaterial.map((material: Material, index: number) =>
          // eslint-disable-next-line no-prototype-builtins
          material.hasOwnProperty('thickness')
            ? renderMaterialMassView(material as MaterialMass, index)
            : renderMaterialNoMassView(material as MaterialNoMass, index),
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => goToMaterialFormScreen()}
        style={[
          css('items-center px-4 py-4 rounded-full border'),
          {
            backgroundColor: getColor('gray-800'),
            borderColor: getColor('gray-800'),
            position: 'absolute',
            width: 'auto',
            right: 20,
            bottom: 50,
          },
        ]}
      >
        <Text style={css('text-white text-lg')}>+ material</Text>
      </TouchableOpacity>
    </View>
  );
}
