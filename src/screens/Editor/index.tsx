import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { Header, Panel, Threed, FloorView } from '@components/index';
import { css } from '@styles/index';
import { rootState } from '@stores/createStore';

interface Props {}

const Editor: React.FC<Props> = () => {
  const navigation = useNavigation();
  const app = useSelector((state: rootState) => state.app);
  const currentFloor = useSelector(
    (state: rootState) => state.app.currentFloor,
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

  return (
    <SafeAreaView style={css('flex-1')}>
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

      {/* <Text style={{ paddingTop: 5, alignSelf: "center" }}>
        Grid: {this.state.grid * 10} cm
      </Text>
      <Slider
        value={this.state.grid}
        style={{ top: -10, alignSelf: "center", width: "90%", height: 50 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        onValueChange={(value) => this.setState({ grid: value })}
      /> */}
      <Panel goToConstructionManagement={goToConstructionManagement} />
    </SafeAreaView>
  );
};

export default Editor;
