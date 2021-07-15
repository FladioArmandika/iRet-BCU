import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { css } from '@styles/index';
import { InputField, Button } from '@components/index';
import { IconMaterialBrick, IconMaterialBrickWhite } from '@assets/icons';
import { createConstruction } from '@stores/app/action';
import { rootState } from '@stores/createStore';
import { Material } from '@type/index';

export default function ConstructionAdd() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const app = useSelector((state: rootState) => state.app);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('wall');
  const [materials, setMaterials] = useState<string[]>([]);
  const [listMaterials, setListMaterials] = useState<Material[]>([]);

  useEffect(() => {
    switch (category) {
      case 'mass':
        setListMaterials(app.materials.mass);
        break;
      case 'noMass':
        setListMaterials(app.materials.noMass);
        break;
      case 'windowGas':
        setListMaterials(app.materials.windowGas);
        break;
      default:
        break;
    }
  }, [category]);

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

  const removeMaterial = (value: string) => {
    let temp = materials;
    temp = temp.filter((e) => e !== value);
    setMaterials(temp);
  };

  const saveConstruction = () => {
    const payload = {
      name,
      category,
      material: materials,
    };
    dispatch(createConstruction(payload));
    navigation.navigate('ConstructionAddSuccess');
  };

  return (
    <View style={css('h-full px-4 pt-20')}>
      <Text style={css('mb-5 text-center text-lg font-bold')}>
        Add Construction
      </Text>
      <View style={css('h-full w-full')}>
        <View style={css('flex flex-row')}>
          <View style={css('flex-1')}>
            <InputField
              placeholder="Name"
              value={name}
              onChange={(v) => setName(v)}
            />
          </View>
        </View>
        <Text style={css('mt-4')}>Category</Text>
        <View style={css('w-full h-12 flex flex-row items-center mt-2 mb-4')}>
          <View>
            <Button
              text="Wall"
              style={{ width: 100, marginRight: 10 }}
              pressed={category === 'wall'}
              onPress={() => {
                setMaterials([]);
                setCategory('wall');
              }}
            />
          </View>
          <View>
            <Button
              text="Floor"
              style={{ width: 100, marginRight: 10 }}
              pressed={category === 'floor'}
              onPress={() => {
                setMaterials([]);
                setCategory('floor');
              }}
            />
          </View>
          <View>
            <Button
              text="Roof"
              style={{ width: 100, marginRight: 10 }}
              pressed={category === 'roof'}
              onPress={() => {
                setMaterials([]);
                setCategory('roof');
              }}
            />
          </View>
        </View>
        <Text style={css('mt-4')}>Material</Text>
        <View style={css('flex flex-row items-center mb-2 mt-2')}>
          {materials.map((m) => (
            <TouchableOpacity
              style={css('px-2 py-2 bg-white mr-2 flex flex-row items-center')}
              onPress={() => removeMaterial(m)}
            >
              <Text>{m}</Text>
              <Text style={css('font-bold ml-2')}>x</Text>
            </TouchableOpacity>
          ))}
        </View>
        {listMaterials.map((m) => (
          <View
            style={css(
              'w-full px-4 py-4 bg-white items-center rounded mt-2 flex flex-row justify-between',
            )}
          >
            <View style={css('flex flex-row items-center')}>
              {renderMaterialImage(m.image)}
              <Text style={css('ml-4')}>{m.name}</Text>
            </View>
            <Button
              text="+"
              style={{ width: 50, marginLeft: 'auto' }}
              pressed={!!materials.find((e) => e === m.name)}
              onPress={() =>
                !materials.find((e) => e === m.name) &&
                setMaterials((old) => [...old, m.name])
              }
            />
          </View>
        ))}
        {/* <Text style={css('mt-8')}>Image</Text> */}
        <Button
          text="CREATE"
          style={css('mt-4')}
          onPress={() => saveConstruction()}
        />
      </View>
    </View>
  );
}
