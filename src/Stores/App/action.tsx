import {
  ACTION_CURRENTFLOOR_SWITCH,
  ACTION_DOOR_ADD,
  ACTION_DOOR_ATTACH_TO_ROOM,
  ACTION_DOOR_UPDATE,
  ACTION_FLOOR_ADD,
  ACTION_FLOOR_UPDATE,
  ACTION_ROOM_ADD,
  ACTION_ROOM_UPDATE,
  ACTION_ROOM_WALLS_MATERIAL,
  ACTION_SHOW_3D,
  ACTION_WINDOW_ADD,
  ACTION_WINDOW_ATTACH_TO_ROOM,
  ACTION_WINDOW_UPDATE,
} from './types';

export const addRoom = (payload: any) => ({ type: ACTION_ROOM_ADD, payload });
export const updateRoom = (payload: any) => ({
  type: ACTION_ROOM_UPDATE,
  payload,
});
export const updateWallMaterials = (payload: any) => ({
  type: ACTION_ROOM_WALLS_MATERIAL,
  payload,
});

export const addDoor = (payload: any) => ({ type: ACTION_DOOR_ADD, payload });
export const updateDoor = (payload: any) => ({
  type: ACTION_DOOR_UPDATE,
  payload,
});
export const attachDoorToRoom = (payload: any) => ({
  type: ACTION_DOOR_ATTACH_TO_ROOM,
  payload,
});

export const addWindow = (payload: any) => ({
  type: ACTION_WINDOW_ADD,
  payload,
});
export const updateWindow = (payload: any) => ({
  type: ACTION_WINDOW_UPDATE,
  payload,
});
export const attachWindowToRoom = (payload: any) => ({
  type: ACTION_WINDOW_ATTACH_TO_ROOM,
  payload,
});

export const addFloor = (payload: any) => ({ type: ACTION_FLOOR_ADD, payload });
export const updateFloor = (payload: any) => ({
  type: ACTION_FLOOR_UPDATE,
  payload,
});
export const switchFloor = (payload: any) => ({
  type: ACTION_CURRENTFLOOR_SWITCH,
  payload,
});

export const createConstruction = (payload: any) => ({
  type: 'CONSTRUCTION_CREATE',
  payload,
});
export const createMaterial = (payload: any) => ({
  type: 'MATERIAL_CREATE',
  payload,
});

export const show3D = () => ({ type: ACTION_SHOW_3D });
export const showComponentControl = (payload: any) => ({
  type: ACTION_SHOW_3D,
  payload,
});
