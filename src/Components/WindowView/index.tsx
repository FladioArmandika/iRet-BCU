/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getColor } from '@styles/index';
import { updateWindow, attachWindowToRoom } from '@stores/app/action';
import { rootState } from '@stores/createStore';
import { Floor, Room } from '@type/index';

interface Props {
  id: string;
  isRoomMoving: boolean;
  isPreviousLevel: boolean;
  isLowerLevel: boolean;
  children?: any;
  grid: number;
}

interface State {
  id: string;
  name: string;
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  active: boolean;
  overlap: boolean;
  previousX?: number | undefined;
  previousY?: number | undefined;
  roomsPlot: Room[];
  orientation: number;
}

const WindowView: React.FC<Props> = ({
  id,
  grid,
  isLowerLevel,
  isPreviousLevel,
  isRoomMoving,
  children,
}) => {
  const dispatch = useDispatch();
  const app = useSelector((state: rootState) => state.app);
  const [state, setState] = useState<State>({
    id: '',
    name: '',
    color: 'gray-600',
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    active: false,
    overlap: false,
    previousX: 0,
    previousY: 0,
    roomsPlot: [],
    orientation: 0,
  });

  const currentFloorRef = useRef<Floor>(app.currentFloor);
  useEffect(() => {
    currentFloorRef.current = app.currentFloor;
  }, [app.currentFloor]);

  const stateRef = useRef<State>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const temp = app.currentFloor.windows.find((x) => x.id === id);
    setState((prevState) => ({
      ...prevState,
      ...temp,
      previousX: temp?.x,
      previousY: temp?.y,
    }));
  }, []);

  useEffect(() => {
    if (isRoomMoving) {
      const newWindow: any = app.currentFloor.windows.find((x) => x.id === id);
      // eslint-disable-next-line no-console
      console.log('UPDATE WINDOW');
      // eslint-disable-next-line no-console
      console.log(newWindow);
      if (newWindow.x !== state.x || newWindow.y !== state.y) {
        setState((prevState) => ({
          ...prevState,
          x: newWindow.x,
          y: newWindow.y,
          previousX: newWindow.x,
          previousY: newWindow.y,
        }));
      }
    }
  }, [app]);

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

    // CHECKBORDER
    const plots = plotingRoom();
    let { newX, newY, newOrientation, wallAttached } = findNearestSide(plots);
    const newWidth =
      newOrientation !== stateRef.current.orientation
        ? stateRef.current.height
        : stateRef.current.width;
    const newHeight =
      newOrientation !== stateRef.current.orientation
        ? stateRef.current.width
        : stateRef.current.height;

    let roomAttached: Room = {} as Room;
    for (let i = 0; i < plots.length; i++) {
      if (isWindowInsideThisRoom(newX, newY, plots[i])) {
        roomAttached = currentFloorRef.current.rooms[i];
        // view correction
        if (roomAttached.x + roomAttached.width === newX) {
          newX -= newWidth;
        }
        if (roomAttached.y + roomAttached.height === newY) {
          newY -= newHeight;
        }
      }
    }

    setState((prevState) => ({
      ...prevState,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
      overlap: false,
      orientation: newOrientation,
      room: roomAttached,
      previousX: newX,
      previousY: newY,
    }));

    // dispatch(
    //   updateWindow({
    //     id: stateRef.current.id,
    //     name: stateRef.current.name,
    //     width: newWidth,
    //     height: newHeight,
    //     x: newX,
    //     y: newY,
    //     overlap: false, // true
    //     floor: currentFloorRef.current.id,
    //     room: roomAttached.id,
    //     wall: wallAttached,
    //   }),
    // );
    dispatch(
      attachWindowToRoom({
        floor: currentFloorRef.current.id,
        window: {
          // ...windows.find((x: any) => x.id === id),
          id: stateRef.current.id,
          name: stateRef.current.name,
          width: newWidth,
          height: newHeight,
          overlap: false,
          x: newX,
          y: newY,
          floor: currentFloorRef.current.id,
          room: roomAttached.id,
          wall: wallAttached,
        },
        room: roomAttached.id,
      }),
    );
  };
  const handlePanResponderMove = (
    event: GestureResponderEvent,
    gestureState: any,
  ) => {
    let isOverlap = false;
    const newX = ((stateRef.current.previousX + gestureState.dx) / grid) * grid;
    const newY = ((stateRef.current.previousY + gestureState.dy) / grid) * grid;

    for (let i = 0; i < currentFloorRef.current.windows.length; i++) {
      const other = currentFloorRef.current.windows[i];
      if (stateRef.current.id.toString() !== other.id) {
        isOverlap =
          newX + stateRef.current.width > other.x &&
          newX < other.x + other.width &&
          newY + stateRef.current.height > other.y &&
          newY < other.y + other.height;
        if (isOverlap) break;
      }
    }

    if (!isOverlap) {
      setState((prevState) => ({
        ...prevState,
        x: newX,
        y: newY,
        overlap: false,
      }));
    } else {
      setState((prevState) => ({ ...prevState, overlap: true }));
    }
  };
  const findNearestSide = (rooms: any) => {
    const { x } = stateRef.current;
    const { y } = stateRef.current;
    let newX = x;
    let newY = y;
    let newOrientation = stateRef.current.orientation; // 0 = horizontal 1 = vertical
    let wallAttached = -1;
    let room;

    for (let i = 0; i < rooms.length; i++) {
      if (isWindowInsideThisRoom(x, y, rooms[i])) {
        room = rooms[i];
      }
    }

    if (rooms.length > 0) {
      if (room) {
        const windowToPlot = [];
        windowToPlot.push(x - room[0].x);
        windowToPlot.push(room[1].x - x);
        windowToPlot.push(y - room[0].y);
        windowToPlot.push(room[2].y - y);

        const nearestSide = windowToPlot.indexOf(Math.min(...windowToPlot));
        if (nearestSide === 0) {
          if (y + 50 >= room[2].y) newY = room[2].y - 50;
          newX = room[0].x;
          newOrientation = 1;
          wallAttached = 4;
        }
        if (nearestSide === 1) {
          if (y + 50 >= room[2].y) newY = room[2].y - 50;
          newX = room[1].x;
          newOrientation = 1;
          wallAttached = 2;
        }
        if (nearestSide === 2) {
          if (x + 50 >= room[1].x) newX = room[1].x - 50;
          newY = room[0].y;
          newOrientation = 0;
          wallAttached = 1;
        }
        if (nearestSide === 3) {
          if (x + 50 >= room[1].x) newX = room[1].x - 50;
          newY = room[2].y;
          newOrientation = 0;
          wallAttached = 3;
        }
      } else {
        const windowToRoom = [];
        const points = [];

        for (let i = 0; i < rooms.length; i++) {
          const windowToSide = [];

          windowToSide.push(Math.abs(x - rooms[i][0].x));
          windowToSide.push(Math.abs(rooms[i][1].x - x));
          windowToSide.push(Math.abs(y - rooms[i][0].y));
          windowToSide.push(Math.abs(rooms[i][2].y - y));

          const nearestSide = windowToSide.indexOf(Math.min(...windowToSide));

          if (nearestSide === 0) {
            windowToRoom.push({
              point: { x: rooms[i][0].x, y: rooms[i][0].y },
              newOrientation: 1,
              room: rooms[i],
            });
            points.push(windowToSide[0]);
          }
          if (nearestSide === 1) {
            windowToRoom.push({
              point: { x: rooms[i][1].x, y: rooms[i][1].y },
              newOrientation: 1,
              room: rooms[i],
            });
            points.push(windowToSide[1]);
          }
          if (nearestSide === 2) {
            windowToRoom.push({
              point: { x: rooms[i][0].x, y: rooms[i][0].y },
              newOrientation: 0,
              room: rooms[i],
            });
            points.push(windowToSide[2]);
          }
          if (nearestSide === 3) {
            windowToRoom.push({
              point: { x: rooms[i][2].x, y: rooms[i][2].y },
              newOrientation: 0,
              room: rooms[i],
            });
            // points.push(rooms[i][2].y)
            points.push(windowToSide[3]);
          }
        }

        const nearestPointIndex = points.indexOf(Math.min(...points));
        newOrientation = windowToRoom[nearestPointIndex].newOrientation;

        if (windowToRoom[nearestPointIndex].newOrientation === 1) {
          const tempNewX = windowToRoom[nearestPointIndex].point.x;
          if (
            isWindowInsideThisRoom(tempNewX, newY, rooms[nearestPointIndex])
          ) {
            newX = tempNewX;
          } else {
            const y1 = Math.abs(
              windowToRoom[nearestPointIndex].room[0].y - newY,
            );
            const y2 = Math.abs(
              windowToRoom[nearestPointIndex].room[2].y - newY,
            );

            let closestY;
            if (y1 < y2) {
              closestY = windowToRoom[nearestPointIndex].room[0].y;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (
                !isWindowInsideThisRoom(
                  newX,
                  closestY,
                  rooms[nearestPointIndex],
                )
              )
                newX = windowToRoom[nearestPointIndex].room[0].x;
            } else {
              closestY = windowToRoom[nearestPointIndex].room[2].y;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (
                !isWindowInsideThisRoom(
                  newX,
                  closestY,
                  rooms[nearestPointIndex],
                )
              )
                newX = windowToRoom[nearestPointIndex].room[1].x;
            }

            if (
              isWindowInsideThisRoom(newX, closestY, rooms[nearestPointIndex])
            ) {
              const x11 = Math.abs(
                windowToRoom[nearestPointIndex].room[0].x - x,
              );
              const x12 = Math.abs(
                windowToRoom[nearestPointIndex].room[1].x - x,
              );

              if (x11 < x12) newX = windowToRoom[nearestPointIndex].room[0].x;
              else newX = windowToRoom[nearestPointIndex].room[1].x - 50;
            }

            newY = closestY;
            newOrientation = 0;
          }
        } else {
          const tempNewY = windowToRoom[nearestPointIndex].point.y;
          if (
            isWindowInsideThisRoom(newX, tempNewY, rooms[nearestPointIndex])
          ) {
            newY = tempNewY;
          } else {
            const x1 = Math.abs(
              windowToRoom[nearestPointIndex].room[0].x - newX,
            );
            const x2 = Math.abs(
              windowToRoom[nearestPointIndex].room[1].x - newX,
            );

            let closestX;
            if (x1 < x2) {
              closestX = windowToRoom[nearestPointIndex].room[0].x;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (
                !isWindowInsideThisRoom(
                  closestX,
                  newY,
                  rooms[nearestPointIndex],
                )
              )
                newY = windowToRoom[nearestPointIndex].room[0].y;
            } else {
              closestX = windowToRoom[nearestPointIndex].room[1].x;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (
                !isWindowInsideThisRoom(
                  closestX,
                  newY,
                  rooms[nearestPointIndex],
                )
              )
                newY = windowToRoom[nearestPointIndex].room[0].y;
            }

            if (
              isWindowInsideThisRoom(closestX, newY, rooms[nearestPointIndex])
            ) {
              const y11 = Math.abs(
                windowToRoom[nearestPointIndex].room[0].y - y,
              );
              const y12 = Math.abs(
                windowToRoom[nearestPointIndex].room[2].y - y,
              );

              if (y11 < y12) newY = windowToRoom[nearestPointIndex].room[0].y;
              else newY = windowToRoom[nearestPointIndex].room[2].y - 50;
            }

            // CORNER ADJUST
            newX = closestX;
            newOrientation = 1;
          }
        }
      }
    }
    return { newX, newY, newOrientation, wallAttached };
  };

  const isWindowInsideThisRoom = (x: number, y: number, room: any) => {
    if (x >= room[0].x && x <= room[1].x && y >= room[0].y && y <= room[2].y) {
      return true;
    }
    return false;
  };

  const plotingRoom = () => {
    const plots = [];
    for (let i = 0; i < currentFloorRef.current.rooms.length; i++) {
      plots.push([
        {
          x: currentFloorRef.current.rooms[i].x,
          y: currentFloorRef.current.rooms[i].y,
        },
        {
          x:
            currentFloorRef.current.rooms[i].x +
            currentFloorRef.current.rooms[i].width,
          y: currentFloorRef.current.rooms[i].y,
        },
        {
          x: currentFloorRef.current.rooms[i].x,
          y:
            currentFloorRef.current.rooms[i].y +
            currentFloorRef.current.rooms[i].height,
        },
        {
          x:
            currentFloorRef.current.rooms[i].x +
            currentFloorRef.current.rooms[i].width,
          y:
            currentFloorRef.current.rooms[i].y +
            currentFloorRef.current.rooms[i].height,
        },
      ]);
    }
    return plots;
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

  return (
    <View
      // ref={(window) => {
      //     .windowRef = window;
      // }}
      style={[
        {
          left: 50,
          top: 100,
          width: state.width,
          height: state.height,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          transform: [{ translateX: state.x }, { translateY: state.y }],
          opacity: state.active ? 0.8 : isPreviousLevel ? 0 : 1,
          zIndex: state.active ? 99 : 1,
          backgroundColor: getColor(state.color),
          borderWidth: 1,
          borderColor: getColor(state.color),
        },
      ]}
      {...panResponder.panHandlers}
    />
  );
};

export default WindowView;
