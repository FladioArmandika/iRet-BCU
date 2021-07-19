/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, PanResponder, PanResponderGestureState, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getColor } from "@styles/index";
import { updateDoor, attachDoorToRoom } from "@stores/app/action";
import { rootState } from "@stores/createStore";
import { Door, Room } from "@type/index";

interface Props {
  id: string;
  isRoomMoving: any;
  children?: any;
  isPreviousLevel: any;
  isLowerLevel: any;
  grid: any;
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

const DoorView: React.FC<Props> = ({ grid, id, isLowerLevel, isPreviousLevel, isRoomMoving, children }) => {
  const dispatch = useDispatch();

  const doors = useSelector((state: rootState) => state.app.doors);
  const app = useSelector((state: rootState) => state.app);
  const currentFloor = useSelector((state: rootState) => state.app.currentFloor);

  const [state, setState] = useState<State>({
    id: "",
    name: "",
    color: "gray-600",
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

  const stateRef = useRef<State>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const temp = currentFloor.doors.find((x) => x.id === id);
    setState((prevState) => ({
      ...prevState,
      ...temp,
      _previousX: temp?.x,
      _previousY: temp?.y,
    }));
  }, []);

  useEffect(() => {
    if (isRoomMoving) {
      const newDoor: Door = currentFloor.doors.find((x) => x.id === id) as Door;
      if (newDoor.x !== state.x || newDoor.y !== state.y) {
        setState((prevState) => ({
          ...prevState,
          x: newDoor.x,
          y: newDoor.y,
        }));
      }
    }
  }, [app]);

  const handlePanResponderGrant = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    setState((prevState) => ({ ...prevState, active: true }));
  };
  const handlePanResponderEnd = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    setState((prevState) => ({ ...prevState, active: false }));

    // CHECKBORDER
    const plots = plotingRoom();
    // eslint-disable-next-line prefer-const
    let { newX, newY, newOrientation } = findNearestSide(plots);
    const newWidth = newOrientation !== stateRef.current.orientation ? stateRef.current.height : stateRef.current.width;
    const newHeight =
      newOrientation !== stateRef.current.orientation ? stateRef.current.width : stateRef.current.height;

    let roomAttached: any;
    for (let i = 0; i < plots.length; i++) {
      if (isDoorInsideThisRoom(newX, newY, plots[i])) {
        roomAttached = currentFloor.rooms[i];
        // view correction
        if (roomAttached.x + roomAttached.width === newX) {
          newX -= 10;
        }
        if (roomAttached.y + roomAttached.height === newY) {
          newY -= 10;
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
      _previousX: newX,
      _previousY: newY,
    }));

    dispatch(
      updateDoor({
        id: stateRef.current.id,
        name: stateRef.current.name,
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY,
        overlap: true,
        floor: currentFloor.id,
        room: roomAttached.id,
      })
    );
    dispatch(
      attachDoorToRoom({
        floor: currentFloor.id,
        door: {
          ...doors.find((x: Door) => x.id === id),
          x: newX,
          y: newY,
        },
        room: roomAttached.id,
      })
    );
  };

  const handlePanResponderMove = (event: any, gestureState: any) => {
    let isOverlap = false;
    const newX = ((stateRef.current.previousX + gestureState.dx) / grid) * grid;
    const newY = ((stateRef.current.previousY + gestureState.dy) / grid) * grid;

    for (let i = 0; i < doors.length; i++) {
      const other = doors[i];
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
    let room;

    for (let i = 0; i < rooms.length; i++) {
      if (isDoorInsideThisRoom(x, y, rooms[i])) {
        room = rooms[i];
      }
    }

    if (rooms.length > 0) {
      if (room) {
        const doorToPlot = [];
        doorToPlot.push(x - room[0].x);
        doorToPlot.push(room[1].x - x);
        doorToPlot.push(y - room[0].y);
        doorToPlot.push(room[2].y - y);

        const nearestSide = doorToPlot.indexOf(Math.min(...doorToPlot));
        if (nearestSide === 0) {
          if (y + 40 >= room[2].y) newY = room[2].y - 40;
          newX = room[0].x;
          newOrientation = 1;
        }
        if (nearestSide === 1) {
          if (y + 40 >= room[2].y) newY = room[2].y - 40;
          newX = room[1].x;
          newOrientation = 1;
        }
        if (nearestSide === 2) {
          if (x + 40 >= room[1].x) newX = room[1].x - 40;
          newY = room[0].y;
          newOrientation = 0;
        }
        if (nearestSide === 3) {
          if (x + 40 >= room[1].x) newX = room[1].x - 40;
          newY = room[2].y;
          newOrientation = 0;
        }
      } else {
        const doorToBox = [];
        const points = [];

        for (let i = 0; i < rooms.length; i++) {
          const doorToSide = [];
          doorToSide.push(Math.abs(x - rooms[i][0].x));
          doorToSide.push(Math.abs(rooms[i][1].x - x));
          doorToSide.push(Math.abs(y - rooms[i][0].y));
          doorToSide.push(Math.abs(rooms[i][2].y - y));

          const nearestSide = doorToSide.indexOf(Math.min(...doorToSide));

          if (nearestSide === 0) {
            doorToBox.push({
              point: { x: rooms[i][0].x, y: rooms[i][0].y },
              newOrientation: 1,
              room: rooms[i],
            });
            // points.push(rooms[i][0].x)
            points.push(doorToSide[0]);
          }
          if (nearestSide === 1) {
            doorToBox.push({
              point: { x: rooms[i][1].x, y: rooms[i][1].y },
              newOrientation: 1,
              room: rooms[i],
            });
            // points.push(rooms[i][1].x)
            points.push(doorToSide[1]);
          }
          if (nearestSide === 2) {
            doorToBox.push({
              point: { x: rooms[i][0].x, y: rooms[i][0].y },
              newOrientation: 0,
              room: rooms[i],
            });
            // points.push(rooms[i][0].y)
            points.push(doorToSide[2]);
          }
          if (nearestSide === 3) {
            doorToBox.push({
              point: { x: rooms[i][2].x, y: rooms[i][2].y },
              newOrientation: 0,
              room: rooms[i],
            });
            // points.push(rooms[i][2].y)
            points.push(doorToSide[3]);
          }
        }

        const nearestPointIndex = points.indexOf(Math.min(...points));
        newOrientation = doorToBox[nearestPointIndex].newOrientation;

        if (doorToBox[nearestPointIndex].newOrientation === 1) {
          const tempNewX = doorToBox[nearestPointIndex].point.x;
          if (isDoorInsideThisRoom(tempNewX, newY, rooms[nearestPointIndex])) {
            newX = tempNewX;
          } else {
            const y1 = Math.abs(doorToBox[nearestPointIndex].room[0].y - newY);
            const y2 = Math.abs(doorToBox[nearestPointIndex].room[2].y - newY);

            let closestY;
            if (y1 < y2) {
              closestY = doorToBox[nearestPointIndex].room[0].y;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (!isDoorInsideThisRoom(newX, closestY, rooms[nearestPointIndex]))
                newX = doorToBox[nearestPointIndex].room[0].x;
            } else {
              closestY = doorToBox[nearestPointIndex].room[2].y;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (!isDoorInsideThisRoom(newX, closestY, rooms[nearestPointIndex]))
                newX = doorToBox[nearestPointIndex].room[1].x;
            }

            if (isDoorInsideThisRoom(newX, closestY, rooms[nearestPointIndex])) {
              const x11 = Math.abs(doorToBox[nearestPointIndex].room[0].x - x);
              const x12 = Math.abs(doorToBox[nearestPointIndex].room[1].x - x);

              if (x11 < x12) newX = doorToBox[nearestPointIndex].room[0].x;
              else newX = doorToBox[nearestPointIndex].room[1].x - 40;
            }

            newY = closestY;
            newOrientation = 0;
          }
        } else {
          const tempNewY = doorToBox[nearestPointIndex].point.y;
          if (isDoorInsideThisRoom(newX, tempNewY, rooms[nearestPointIndex])) {
            newY = tempNewY;
          } else {
            const x1 = Math.abs(doorToBox[nearestPointIndex].room[0].x - newX);
            const x2 = Math.abs(doorToBox[nearestPointIndex].room[1].x - newX);

            let closestX;
            if (x1 < x2) {
              closestX = doorToBox[nearestPointIndex].room[0].x;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (!isDoorInsideThisRoom(closestX, newY, rooms[nearestPointIndex]))
                newY = doorToBox[nearestPointIndex].room[0].y;
            } else {
              closestX = doorToBox[nearestPointIndex].room[1].x;
              // CHECK IF IT's STILL NOT INSIDE ROOM
              if (!isDoorInsideThisRoom(closestX, newY, rooms[nearestPointIndex]))
                newY = doorToBox[nearestPointIndex].room[0].y;
            }

            if (isDoorInsideThisRoom(closestX, newY, rooms[nearestPointIndex])) {
              const y11 = Math.abs(doorToBox[nearestPointIndex].room[0].y - y);
              const y12 = Math.abs(doorToBox[nearestPointIndex].room[2].y - y);

              if (y11 < y12) newY = doorToBox[nearestPointIndex].room[0].y;
              else newY = doorToBox[nearestPointIndex].room[2].y - 40;
            }

            // CORNER ADJUST
            newX = closestX;
            newOrientation = 1;
          }
        }
      }
    }
    return { newX, newY, newOrientation };
  };

  const isDoorInsideThisRoom = (x: number, y: number, room: any) => {
    if (x >= room[0].x && x <= room[1].x && y >= room[0].y && y <= room[2].y) {
      return true;
    }
    return false;
  };

  const plotingRoom = () => {
    const plots = [];
    for (let i = 0; i < currentFloor.rooms.length; i++) {
      plots.push([
        { x: currentFloor.rooms[i].x, y: currentFloor.rooms[i].y },
        {
          x: currentFloor.rooms[i].x + currentFloor.rooms[i].width,
          y: currentFloor.rooms[i].y,
        },
        {
          x: currentFloor.rooms[i].x,
          y: currentFloor.rooms[i].y + currentFloor.rooms[i].height,
        },
        {
          x: currentFloor.rooms[i].x + currentFloor.rooms[i].width,
          y: currentFloor.rooms[i].y + currentFloor.rooms[i].height,
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
    })
  ).current;

  return (
    <View
      style={[
        {
          left: 50,
          top: 100,
          width: state.width,
          height: state.height,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
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

export default DoorView;
