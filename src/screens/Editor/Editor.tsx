import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { Header, Threed, FloorView, BottomSheet, Label } from '@components/index';
import { css } from '@styles/index';
import { rootState } from '@stores/createStore';
import { showRoomMoved } from '@stores/app/action';

import MenuPanel from './MenuPanel';
import ComponentControls from './ComponentControls';
import { IconClose } from '@assets/icons';

interface Props {}

const Editor: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const app = useSelector((state: rootState) => state.app);
  const currentFloor = useSelector(
    (state: rootState) => state.app.currentFloor
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    name: '',
    width: 0,
    height: 0,
    grid: 10,
  });

  const goToConstructionManagement = () => {
    navigation.navigate('Construction');
  };

  useEffect(() => {
    console.log('app');
    console.log(app);
  }, []);

  return (
    <SafeAreaView style={css('flex-1 h-full')}>
      <Header />
      {currentFloor && (
        <View style={css('flex-1')}>
          {app.show3D ? (
            <Threed floors={app.floors} />
          ) : (
            app.floors.map((floor, index) => (
              <View style={css('absolute')} key={index}>
                <FloorView
                  floor={floor}
                  grid={state.grid}
                  isCurrent={floor.level === currentFloor.level}
                  isLowerLevel={floor.level < currentFloor.level}
                  isPreviousLevel={floor.level === currentFloor.level - 1}
                  isUpperLevel={floor.level > currentFloor.level}
                />
              </View>
            ))
          )}
        </View>
      )}
      {app.roomMoved && (
        <BottomSheet>
          <TouchableOpacity
            onPress={() => dispatch(showRoomMoved({roomId: null}))}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600'
              ),
            ]}>
            <IconClose />
            <Label style={css('text-white mt-3')}>Cancel</Label>
          </TouchableOpacity>
          <Label style={css('text-white')}>move your room accros the floor</Label>
        </BottomSheet>
      )}
      {app.roomFocused && !app.roomMoved && <ComponentControls room={app.roomFocused} />}
      {!app.roomFocused && (
        <MenuPanel goToConstructionManagement={goToConstructionManagement} />
      )}
    </SafeAreaView>
  );
};

export default Editor;
