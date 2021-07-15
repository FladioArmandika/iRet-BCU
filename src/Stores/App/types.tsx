import {
  MaterialAirGap,
  MaterialMass,
  MaterialNoMass,
  MaterialWindowGas,
  MaterialWindowGlazing,
  Construction,
  Door,
  Floor,
  Room,
  Window,
} from '@type/index';

export const ACTION_ROOM_ADD = 'ACTION_ROOM_ADD';
export const ACTION_ROOM_UPDATE = 'ACTION_ROOM_UPDATE';
export const ACTION_ROOM_WALLS_MATERIAL = 'ACTION_ROOM_WALLS_MATERIAL';
export const ACTION_DOOR_ADD = 'ACTION_DOOR_ADD';
export const ACTION_DOOR_UPDATE = 'ACTION_DOOR_UPDATE';
export const ACTION_DOOR_ATTACH_TO_ROOM = 'ACTION_DOOR_ATTACH_TO_ROOM';
export const ACTION_WINDOW_ADD = 'ACTION_WINDOW_ADD';
export const ACTION_WINDOW_UPDATE = 'ACTION_WINDOW_UPDATE';
export const ACTION_WINDOW_ATTACH_TO_ROOM = 'ACTION_WINDOW_ATTACH_TO_ROOM';
export const ACTION_FLOOR_ADD = 'ACTION_FLOOR_ADD';
export const ACTION_FLOOR_UPDATE = 'ACTION_FLOOR_UPDATE';
export const ACTION_CURRENTFLOOR_SWITCH = 'ACTION_CURRENTFLOOR_SWITCH';
export const ACTION_SHOW_3D = 'ACTION_SHOW_3D';
export const ACTION_CONSTRUCTION_CREATE = 'ACTION_CONSTRUCTION_CREATE';
export const ACTION_MATERIAL_CREATE = 'ACTION_MATERIAL_CREATE';

export type MaterialList = {
  mass: MaterialMass[];
  noMass: MaterialNoMass[];
  airGap: MaterialAirGap[];
  windowGlazing: MaterialWindowGlazing[];
  windowGas: MaterialWindowGas[];
};

export type AppState = {
  currentFloor: Floor;
  floors: Floor[];
  rooms: Room[];
  doors: Door[];
  windows: Window[];
  show3D: any;

  colors: string[];
  construction: Construction[];
  materials: MaterialList;
};

type AddRoomAction = {
  type: typeof ACTION_ROOM_ADD;
  payload: Room;
};

type UpdateRoomAction = {
  type: typeof ACTION_ROOM_UPDATE;
  payload: {
    id: string;
    name: string;
    x: number;
    y: number;
    overlap: boolean;
    floor: string;
  };
};

type UpdateWallsMaterialAction = {
  type: typeof ACTION_ROOM_WALLS_MATERIAL;
  payload: {
    floor: string;
    room: string;
    wall: string[];
  };
};

type AddFloorAction = {
  type: typeof ACTION_FLOOR_ADD;
  payload: Floor;
};

type UpdateFloorAction = {
  type: typeof ACTION_FLOOR_UPDATE;
  payload: Floor;
};

type AddDoorAction = {
  type: typeof ACTION_DOOR_ADD;
  payload: Door;
};

type UpdateDoorAction = {
  type: typeof ACTION_DOOR_UPDATE;
  payload: {
    id: string;
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    overlap: boolean;
    floor: string;
    room: string;
  };
};

type AttachDoorToRoomAction = {
  type: typeof ACTION_DOOR_ATTACH_TO_ROOM;
  payload: {
    floor: string;
    door: Door;
    room: string;
  };
};

type AddWindowAction = {
  type: typeof ACTION_WINDOW_ADD;
  payload: Window;
};

type UpdateWindowAction = {
  type: typeof ACTION_WINDOW_UPDATE;
  payload: {
    id: string;
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    overlap: boolean;
    floor: string;
    room: string;
    wall: number;
  };
};

type AttachWindowToRoomAction = {
  type: typeof ACTION_WINDOW_ATTACH_TO_ROOM;
  payload: {
    floor: string;
    window: Window;
    room: string;
  };
};

type SwitchCurrentFloorAction = {
  type: typeof ACTION_CURRENTFLOOR_SWITCH;
  payload: Floor;
};

type createConstruction = {
  type: typeof ACTION_CONSTRUCTION_CREATE;
  payload: {
    name: string;
    category: string;
    material: string[];
    image: string;
  };
};

type createMaterial = {
  type: typeof ACTION_MATERIAL_CREATE;
  payload: {
    name: string;
    category: string;
    thermalAbsorptance: number;
    solarAbsorptance: number;
    visibleAbsorptance: number;
    image: string;

    roughness?: string;
    thickness?: number;
    conductivity?: number;
    density?: number;
    specificHeat?: number;

    thermalResistance?: number;
  };
};

type Show3DAction = {
  type: typeof ACTION_SHOW_3D;
};

export type AppActiontypes =
  | AddRoomAction
  | UpdateRoomAction
  | UpdateWallsMaterialAction
  | AddFloorAction
  | UpdateFloorAction
  | AddDoorAction
  | UpdateDoorAction
  | AttachDoorToRoomAction
  | AddWindowAction
  | UpdateWindowAction
  | AttachWindowToRoomAction
  | SwitchCurrentFloorAction
  | Show3DAction
  | createConstruction
  | createMaterial;
