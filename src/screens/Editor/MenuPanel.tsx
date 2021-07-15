/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { PickerIOS } from '@react-native-picker/picker';

import { Button, Modal, Label, InputField } from '@components/index';
import { css, getColor } from '@styles/index';
import {
  addRoom,
  addDoor,
  show3D,
  addFloor,
  switchFloor,
  addWindow,
} from '@stores/app/action';
import {
  Icon3D,
  IconBuilding,
  IconDoor,
  IconRoom,
  IconSave,
  IconWindow,
} from '@assets/icons';
import { rootState } from '@stores/createStore';
import { Construction, Floor, RoomConstruction } from '@type/index';
import { colors } from '../../constants/colors';
import idGenerator from '../../components/Helpers/idGenerator';
import { generateTxt } from '../../components/Helpers/generateTxt';

interface Props {
  goToConstructionManagement(): void;
}

interface RoomForm {
  name: string;
  width: number;
  height: number;
  depth: number;
  color: string;
  isOverlap: boolean;
  x: number;
  y: number;
  type: string;
  construction: RoomConstruction;
}

interface State {
  modal: boolean;
  form: RoomForm;
  currentFloor: number;
  currentFloorId: string;
}

const MenuPanel: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const colorsList = [
    colors.color1,
    colors.color2,
    colors.color3,
    colors.color4,
    colors.color5,
    colors.color6,
    colors.color7,
    colors.color8,
    colors.color9,
    colors.color10,
    colors.color11,
    colors.color12,
  ];
  const rooms = useSelector((state: rootState) => state.app.rooms);
  const floors = useSelector((state: rootState) => state.app.floors);
  const currentFloor = useSelector(
    (state: rootState) => state.app.currentFloor,
  );
  const construction = useSelector(
    (state: rootState) => state.app.construction,
  );
  const materials = useSelector((state: rootState) => state.app.materials);

  const [state, setState] = useState<State>({
    modal: false,
    form: {
      name: '',
      width: 10,
      height: 10,
      depth: 4,
      color: colorsList[rooms.length],
      isOverlap: false,
      x: 0,
      y: 0,
      type: 'room',
      construction: {
        wall: ['R1Construct', 'R1Construct', 'R1Construct', 'R1Construct'],
        floor: 'R1FloorConstruct',
        roof: 'R1RoofConstruct',
      },
    },
    currentFloor: 0,
    currentFloorId: '',
  });

  useEffect(() => {
    if (floors.length === 1) switchFloorView(floors[0]);
    if (floors.length === 0) {
      addNewFloor();
    }
  }, []);

  const toggleModal = () => {
    setState((prevState) => ({ ...prevState, modal: !prevState.modal }));
  };
  const handleChange = (value: any, key: string) => {
    if (key === 'width' || key === 'height' || key === 'depth') {
      setState((prevState) => ({
        ...prevState,
        form: { ...prevState.form, [key]: parseFloat(value) * 10 },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        form: { ...prevState.form, [key]: value },
      }));
    }
  };

  const handlePickerChange = (value: any, key: string) => {
    if (value !== '0') {
      setState((prevState) => ({
        ...prevState,
        form: { ...prevState.form, [key]: value },
      }));
    }
  };

  const handleWallPickerChange = (value: any, key: string) => {
    if (value !== '0') {
      setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          [key]: {
            ...prevState.form.construction,
            wall: [value, value, value, value],
          },
        },
      }));
    }
  };

  const addNewRoom = () => {
    dispatch(
      addRoom({
        ...state.form,
        id: idGenerator(),
        floor: currentFloor.id,
        doors: [],
        windows: [],
      }),
    );

    setState((prevState) => ({
      ...prevState,
      modal: false,
      form: {
        ...prevState.form,
        name: '',
        width: 0,
        height: 0,
        depth: 0,
        color: '',
        construction: {
          wall: ['R1Construct', 'R1Construct', 'R1Construct', 'R1Construct'],
          floor: 'R1FloorConstruct',
          roof: 'R1RoofConstruct',
        },
      },
    }));
  };

  const addNewDoor = () => {
    if (currentFloor.rooms.length <= 0) {
      Alert.alert('add room first');
    } else {
      dispatch(
        addDoor({
          id: `door-${idGenerator()}`,
          color: 'color10',
          isOverlap: false,
          width: 40,
          height: 10,
          depth: 10,
          x: 0,
          y: 0,
          type: 'door',
          floor: currentFloor.id,
        }),
      );
    }
  };

  const addNewWindow = () => {
    if (currentFloor.rooms.length <= 0) {
      Alert.alert('add room first');
    } else {
      dispatch(
        addWindow({
          id: `window-${idGenerator()}`,
          color: 'color11',
          isOverlap: false,
          width: 50,
          height: 8,
          depth: 10,
          x: 0,
          y: 0,
          type: 'window',
          floor: currentFloor.id,
          construction: 'R1Construct',
        }),
      );
    }
  };

  const addNewFloor = () => {
    const newFloor = {
      id: `floor-${idGenerator()}`,
      level: floors.length + 1,
      rooms: [],
      doors: [],
      windows: [],
    };
    dispatch(addFloor(newFloor));
    switchFloorView(newFloor);
  };

  const handleGenerateTxt = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const fileUri = `${FileSystem.documentDirectory}text.idf`;
      const stringFile = generateTxt(floors, materials, construction);

      await FileSystem.writeAsStringAsync(fileUri, stringFile, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(fileUri);
    }
  };

  const switchFloorView = (floor: Floor) => {
    dispatch(switchFloor(floor));
  };

  const goTo3DScreen = () => {
    dispatch(show3D());
  };

  return (
    <View>
      {state.modal && (
        <Modal title="Add Room">
          <InputField
            placeholder="Name"
            value={state.form.name}
            onChange={(v) => handleChange(v, 'name')}
          />
          <View style={css('flex flex-row')}>
            <View style={css('flex-1')}>
              <InputField
                placeholder="Width (m)"
                value={state.form.width}
                onChange={(v) => handleChange(v, 'width')}
                keyboardType="numeric"
              />
            </View>
            <View style={css('flex-1 ml-2')}>
              <InputField
                placeholder="Height (m)"
                value={state.form.height}
                onChange={(v) => handleChange(v, 'height')}
                keyboardType="numeric"
              />
            </View>
          </View>
          <InputField
            placeholder="Depth (m)"
            value={state.form.depth}
            onChange={(v) => handleChange(v, 'depth')}
            keyboardType="numeric"
          />

          <View style={css('flex-row flex-wrap mt-2')}>
            {colorsList.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => handleChange(color, 'color')}
                style={[
                  css('w-8 h-8 rounded-full mx-2 my-1 border-gray-800'),
                  {
                    borderWidth: color === state.form.color ? 2 : 0,
                    backgroundColor: getColor(color),
                  },
                ]}
              />
            ))}
          </View>

          <View style={css('flex flex-col mt-4')}>
            <PickerIOS
              selectedValue={state.form.construction.wall[0]}
              itemStyle={{ height: 50 }}
              style={{ height: 50, width: '100%', marginTop: 0 }}
              onValueChange={(itemValue) =>
                handleWallPickerChange(itemValue, 'construction')
              }
            >
              {construction.map(
                (wall, index) =>
                  wall.category === 'wall' && (
                    <PickerIOS.Item
                      label={wall.name}
                      value={wall.name}
                      key={index}
                    />
                  ),
              )}
            </PickerIOS>
          </View>
          <View style={css('flex flex-col mt-4')}>
            <PickerIOS
              selectedValue={state.form.construction.floor}
              itemStyle={{ height: 50 }}
              style={{ height: 50, width: '100%', marginTop: 0 }}
              onValueChange={(itemValue) =>
                handlePickerChange(
                  { ...state.form.construction, floor: itemValue },
                  'construction',
                )
              }
            >
              {construction.map(
                (floor, index) =>
                  floor.category === 'floor' && (
                    <PickerIOS.Item
                      label={floor.name}
                      value={floor.name}
                      key={index}
                    />
                  ),
              )}
            </PickerIOS>
          </View>
          <View style={css('flex flex-col mt-4')}>
            <PickerIOS
              selectedValue={state.form.construction.roof}
              itemStyle={{ height: 50 }}
              style={{ height: 50, width: '100%', marginTop: 0 }}
              onValueChange={(itemValue) =>
                handlePickerChange(
                  { ...state.form.construction, roof: itemValue },
                  'construction',
                )
              }
            >
              {construction.map(
                (roof: Construction, index: number) =>
                  roof.category === 'roof' && (
                    <PickerIOS.Item
                      label={roof.name}
                      value={roof.name}
                      key={index}
                    />
                  ),
              )}
            </PickerIOS>
          </View>

          <View style={css('flex-row mt-4')}>
            <Button
              text="Cancel"
              onPress={() => toggleModal()}
              bgColor={getColor('white')}
              textColor={getColor('gray-800')}
            />
            <View style={css('flex-1 ml-2')}>
              <Button
                text="Create"
                onPress={() => addNewRoom()}
                disabled={
                  state.form.name === '' ||
                  !state.form.width ||
                  state.form.width === 0 ||
                  !state.form.height ||
                  state.form.height === 0 ||
                  !state.form.depth ||
                  state.form.depth === 0 ||
                  state.form.color === ''
                }
              />
            </View>
          </View>
        </Modal>
      )}
      {/* <View style={css('flex-row items-start pt-2 px-4  h-14')}> */}

      <View
        style={css('h-20 w-full px-4 flex-row items-center justify-between')}
      >
        <ScrollView horizontal contentContainerStyle={css('flex-row w-2/3')}>
          {floors.map((floor, index) => (
            <View style={css('mr-4 ')} key={index}>
              <Button
                text={(index + 1).toString()}
                pressed={currentFloor.level === index + 1}
                onPress={() => switchFloorView(floor)}
              />
            </View>
          ))}
          <Button
            text="+ Floor"
            style={{ width: 100 }}
            onPress={() => addNewFloor()}
          />
        </ScrollView>
        <View style={css('flex flex-row items-center w-1/3 justify-end')}>
          <TouchableOpacity
            onPress={() => goTo3DScreen()}
            style={[
              css('items-center px-2 py-2 rounded-full border'),
              {
                backgroundColor: getColor('gray-800'),
                borderColor: getColor('gray-800'),
              },
            ]}
          >
            <Icon3D />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={css('flex-row items-center justify-start py-6 pl-4 bg-gray-800')}
      >
        <ScrollView horizontal>
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600',
              ),
            ]}
          >
            <IconRoom />
            <Label style={css('text-white mt-3')}>Room</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addNewDoor()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600',
              ),
            ]}
          >
            <IconDoor />
            <Label style={css('text-white mt-3')}>Door</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addNewWindow()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600',
              ),
            ]}
          >
            <IconWindow />
            <Label style={css('text-white mt-3')}>Window</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.goToConstructionManagement()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600',
              ),
            ]}
          >
            <IconBuilding />
            <Label style={css('text-white mt-3')}>Manage</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleGenerateTxt()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600',
              ),
            ]}
          >
            <IconSave />
            <Label style={css('text-white mt-3')}>Export</Label>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default MenuPanel;
