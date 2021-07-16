import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Door, Room, Window } from '@type/index';
import { rootState } from '@stores/createStore';
import { RoomView, DoorView, WindowView } from '@components/index';

interface Props {
  isUpperLevel: any;
  isLowerLevel: any;
  isPreviousLevel: any;
  isCurrent: any;
  grid: any;
  floor: any;
}

const FloorView: React.FC<Props> = ({
  isUpperLevel,
  isLowerLevel,
  isPreviousLevel,
  isCurrent,
  grid,
  floor,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentFloor = useSelector(
    (state: rootState) => state.app.currentFloor,
  );

  const [isRoomMoving, setIsRoomMoving] = useState(false);

  return (
    <View
      style={[
        isUpperLevel && { opacity: 0 },
        isLowerLevel && { opacity: 0 },
        isPreviousLevel ? { opacity: 1 } : {},
        isCurrent ? { opacity: 1 } : {},
      ]}
    >
      {
        // currentFloor &&
        floor.rooms.map((room: Room, index: number) => (
          <RoomView
            key={index}
            {...room}
            grid={grid}
            isPreviousLevel={isPreviousLevel}
            isLowerLevel={isLowerLevel}
            isRoomMoving={isRoomMoving}
            setIsRoomMoving={setIsRoomMoving}
          />
        ))
      }
      {
        // currentFloor &&
        floor.doors.map((door: Door, index: any) => (
          <DoorView
            key={index}
            {...door}
            grid={grid}
            isPreviousLevel={isPreviousLevel}
            isLowerLevel={isLowerLevel}
            isRoomMoving={isRoomMoving}
          />
        ))
      }
      {
        // currentFloor &&
        floor.windows.map((window: Window, index: any) => (
          <WindowView
            key={index}
            {...window}
            grid={grid}
            isPreviousLevel={isPreviousLevel}
            isLowerLevel={isLowerLevel}
            isRoomMoving={isRoomMoving}
          />
        ))
      }
    </View>
  );
};

export default FloorView;
