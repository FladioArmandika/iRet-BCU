/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  ImageBackground,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { css, getColor } from '@styles/index';
import {
  updateRoom,
  updateDoor,
  updateWindow,
  updateWallMaterials,
} from '@stores/app/action';
import { Label } from '@components/index';
// @ts-ignore
import Grid from '@assets/icons';
import { Floor, Room, RoomConstruction, Window } from '@type/index';
import { rootState } from '@stores/createStore';

interface Props {
  isLowerLevel: boolean;
  isPreviousLevel: boolean;
  isRoomMoving: boolean;
  width: number;
  height: number;
  name: string;
  id: string;
  grid: number;
  setIsRoomMoving(value: boolean): void;
}

interface State {
  id: string;
  name: string;
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  xObj: number;
  yObj: number;
  active: boolean;
  overlap: boolean;
  previousX: number;
  previousY: number;
  construction: RoomConstruction;
}

const RoomView: React.FC<Props> = ({
  id,
  name,
  width,
  height,
  grid,
  isLowerLevel,
  isPreviousLevel,
  isRoomMoving,
  setIsRoomMoving,
}) => {
  const dispatch = useDispatch();
  const app = useSelector((state: rootState) => state.app);
  const [state, setState] = useState<State>({
    id: '',
    name: '',
    color: 'gray-400',
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    xObj: 0,
    yObj: 0,
    active: false,
    overlap: false,
    previousX: 0,
    previousY: 0,
    construction: {} as RoomConstruction,
  });

  const stateRef = useRef<State>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const currentFloorRef = useRef<Floor>(app.currentFloor);
  useEffect(() => {
    currentFloorRef.current = app.currentFloor;
  }, [app.currentFloor]);

  useEffect(() => {
    const temp: Room = app.currentFloor.rooms.find((x) => x.id === id) as Room;
    setState((prevState) => ({
      ...prevState,
      ...temp,
      xObj: temp.x,
      yObj: temp.y,
      previousX: temp.x,
      previousY: temp.y,
    }));
  }, []);

  const handlePanResponderGrant = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    setState((prevState) => ({ ...prevState, active: true }));
  };
  const handlePanResponderEnd = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    setState((prevState) => ({ ...prevState, active: false }));
    const x: number = stateRef.current.xObj;
    const y: number = stateRef.current.yObj;
    detectInternalWall(x, y);
    setState((prevState) => ({
      ...prevState,
      x,
      y,
      xObj: x,
      yObj: y,
      overlap: false,
      previousX: x,
      previousY: y,
    }));

    setIsRoomMoving(false);

    dispatch(
      updateRoom({
        id: stateRef.current.id,
        name: stateRef.current.name,
        x,
        y,
        overlap: false,
        floor: currentFloorRef.current.id,
      }),
    );
  };

  const handlePanResponderMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (!isPreviousLevel && !isLowerLevel) {
      const newX =
        ((stateRef.current.previousX + gestureState.dx) / grid) * grid;
      const newY =
        ((stateRef.current.previousY + gestureState.dy) / grid) * grid;

      const isOverlap = isRoomOverlap(newX, newY);

      setIsRoomMoving(true);

      if (!isOverlap) {
        // CHANGE DOOR & WINDOW POSITION
        // eslint-disable-next-line array-callback-return
        currentFloorRef.current.rooms.map((room: Room) => {
          if (room.id === stateRef.current.id) {
            // CHANGE DOORS POSITION
            if (room.doors.length > 0) {
              // eslint-disable-next-line array-callback-return
              room.doors.map((door) => {
                if (door.room === room.id) {
                  const newDoorX = door.x - (stateRef.current.x - newX);
                  const newDoorY = door.y - (stateRef.current.y - newY);
                  dispatch(
                    updateDoor({
                      id: door.id,
                      x: newDoorX,
                      y: newDoorY,
                      floor: currentFloorRef.current.id,
                      room: room.id,
                    }),
                  );
                }
              });
            }
            // CHANGE WINDOWS POSITION
            if (room.windows.length > 0) {
              // eslint-disable-next-line array-callback-return
              room.windows.map((window: Window) => {
                if (window.room === room.id) {
                  const newWindowX = window.x - (stateRef.current.x - newX);
                  const newWindowY = window.y - (stateRef.current.y - newY);
                  dispatch(
                    updateWindow({
                      id: window.id,
                      x: newWindowX,
                      y: newWindowY,
                      floor: currentFloorRef.current.id,
                      room: room.id,
                    }),
                  );
                }
              });
            }
          }
        });

        // eslint-disable-next-line no-console
        // console.log(`x : ${newX}, y: ${newY}`);

        setState((prevState) => ({
          ...prevState,
          x: newX,
          y: newY,
          xObj: newX,
          yObj: newY,
          overlap: false,
        }));
      } else {
        // OVERLAP
        setState((prevState) => ({ ...prevState, overlap: true }));
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderEnd: (e, gestureState) => true,
      onPanResponderTerminate: handlePanResponderEnd,
      onPanResponderTerminationRequest: () => true,
    }),
  ).current;

  const isRoomOverlap = (newX: number, newY: number) => {
    // check overlap
    let isOverlap = false;
    for (let i = 0; i < currentFloorRef.current.rooms.length; i++) {
      const other = currentFloorRef.current.rooms[i];
      if (stateRef.current.id !== other.id) {
        isOverlap =
          newX + stateRef.current.width > other.x &&
          newX < other.x + other.width &&
          newY + stateRef.current.height > other.y &&
          newY < other.y + other.height;
        if (isOverlap) break;
      }
    }

    // CHECK POSSIBLE AREA AT PREVIOUS FLOOR
    if (currentFloorRef.current.level !== 1) {
      const prevFloor: Floor = app.floors.find(
        (x) => x.level === currentFloorRef.current.level - 1,
      ) as Floor;
      for (let i = 0; i < prevFloor.rooms.length; i++) {
        const insideRoom =
          newX + stateRef.current?.width <=
            prevFloor.rooms[i].x + prevFloor.rooms[i].width &&
          newX >= prevFloor.rooms[i].x &&
          newY + stateRef.current?.height <=
            prevFloor.rooms[i].y + prevFloor.rooms[i].height &&
          newY >= prevFloor.rooms[i].y;
        if (insideRoom) {
          isOverlap = false;
          break;
        } else {
          isOverlap = true;
        }
      }
    }

    return isOverlap;
  };

  const detectInternalWall = (x: number, y: number) => {
    // eslint-disable-next-line array-callback-return
    currentFloorRef.current.rooms.map((room) => {
      if (room.id !== stateRef.current.id) {
        if (x === room.x + room.width) {
          dispatch(
            updateWallMaterials({
              floor: currentFloorRef.current.id,
              room: stateRef.current.id,
              wall: [
                stateRef.current.construction.wall[0],
                stateRef.current.construction.wall[0],
                stateRef.current.construction.wall[0],
                'R3Construct',
              ],
            }),
          );
        }
        if (x + stateRef.current.width === room.x) {
          dispatch(
            updateWallMaterials({
              floor: currentFloorRef.current.id,
              room: stateRef.current.id,
              wall: [
                stateRef.current.construction.wall[0],
                'R3Construct',
                stateRef.current.construction.wall[0],
                stateRef.current.construction.wall[0],
              ],
            }),
          );
        }

        if (y === room.y + room.height) {
          dispatch(
            updateWallMaterials({
              floor: currentFloorRef.current.id,
              room: stateRef.current.id,
              wall: [
                'R3Construct',
                stateRef.current.construction.wall[0],
                stateRef.current.construction.wall[0],
                stateRef.current.construction.wall[0],
              ],
            }),
          );
        }

        if (y + stateRef.current.height === room.y) {
          dispatch(
            updateWallMaterials({
              floor: currentFloorRef.current.id,
              room: stateRef.current.id,
              wall: [
                stateRef.current.construction.wall[0],
                stateRef.current.construction.wall[0],
                'R3Construct',
                stateRef.current.construction.wall[0],
              ],
            }),
          );
        }
      }
    });
  };

  return (
    <View
      // ref={(room) => {
      //   roomRef = room;
      // }}
      style={[
        {
          backgroundColor: isPreviousLevel
            ? getColor('gray-200')
            : getColor(state.color),
          borderColor: isPreviousLevel
            ? getColor('gray-200')
            : getColor(state.color),
        },
        {
          left: 50,
          top: 100,
          width,
          height,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          transform: [{ translateX: state.x }, { translateY: state.y }],
          opacity: state.active ? 0.8 : 1,
          zIndex: state.active ? 99 : 1,
          borderWidth: 1,
        },
        state.overlap && {
          transform: [{ translateX: state.x }, { translateY: state.y }],
          opacity: 0.6,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {isPreviousLevel ? (
        <ImageBackground source={Grid} style={{ width, height }}>
          {/* <Label style={css("font-medium text-white")}>{this.name}</Label> */}
        </ImageBackground>
      ) : (
        <Label style={css('font-medium text-white')}>{name}</Label>
      )}
    </View>
  );
};

export default RoomView;
