/* eslint-disable no-param-reassign */
import {
  Door,
  Floor,
  Room,
  Window,
  MaterialMass,
  MaterialNoMass,
} from '@type/index';
import {
  ACTION_CONSTRUCTION_CREATE,
  ACTION_CURRENTFLOOR_SWITCH,
  ACTION_DOOR_ADD,
  ACTION_DOOR_ATTACH_TO_ROOM,
  ACTION_DOOR_UPDATE,
  ACTION_FLOOR_ADD,
  ACTION_FLOOR_UPDATE,
  ACTION_MATERIAL_CREATE,
  ACTION_ROOM_ADD,
  ACTION_ROOM_UPDATE,
  ACTION_ROOM_WALLS_MATERIAL,
  ACTION_SHOW_3D,
  ACTION_SHOW_COMPONENT_CONTROL,
  ACTION_SHOW_ROOM_MOVED,
  ACTION_WINDOW_ADD,
  ACTION_WINDOW_ATTACH_TO_ROOM,
  ACTION_WINDOW_UPDATE,
  AppActiontypes,
  AppState,
} from './types';

const initialState: AppState = {
  colors: [
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
  ],
  floors: [],
  rooms: [],
  doors: [],
  windows: [],
  currentFloor: {
    id: 'string',
    level: -1,
    rooms: [],
    doors: [],
    windows: [],
  },
  show3D: false,
  construction: [
    {
      name: 'R1Construct',
      image: '',
      material: ['ExternalR14', 'ExternalR15'],
      category: 'wall',
    },
    {
      name: 'R2Construct',
      image: '',
      material: ['ExternalR14'],
      category: 'wall',
    },
    {
      name: 'R3Construct',
      image: '',
      material: ['InternalR14'],
      category: 'wall',
    },
    {
      name: 'R1FloorConstruct',
      image: '',
      material: ['ExternalR14'],
      category: 'floor',
    },
    {
      name: 'R1RoofConstruct',
      image: '',
      material: ['ExternalR14', 'ExternalR15'],
      category: 'roof',
    },
  ],
  materials: {
    noMass: [
      {
        name: 'ExternalR14',
        roughness: 'rough',
        thermalResistance: 2.290965,
        thermalAbsorptance: 0.9,
        solarAbsorptance: 0.75,
        visibleAbsorptance: 0.75,
        image: 'brick-default',
      },
      {
        name: 'ExternalR15',
        roughness: 'rough',
        thermalResistance: 2.490965,
        thermalAbsorptance: 0.8,
        solarAbsorptance: 0.72,
        visibleAbsorptance: 0.72,
        image: 'brick-default',
      },
      {
        name: 'ExternalR16',
        roughness: 'rough',
        thermalResistance: 3.490965,
        thermalAbsorptance: 0.8,
        solarAbsorptance: 0.72,
        visibleAbsorptance: 0.72,
        image: 'brick-default',
      },
      {
        name: 'InternalR14',
        roughness: 'rough',
        thermalResistance: 2.290965,
        thermalAbsorptance: 0.9,
        solarAbsorptance: 0.75,
        visibleAbsorptance: 0.75,
        image: 'brick-white',
      },
      {
        name: 'R31LAYER',
        roughness: 'rough',
        thermalResistance: 5.456,
        thermalAbsorptance: 0.9,
        solarAbsorptance: 0.75,
        visibleAbsorptance: 0.75,
        image: '',
      },
    ],
    mass: [
      {
        name: 'C5 - 4 IN HW CONCRETE',
        roughness: 'mediumrough',
        thickness: 0.1014984,
        conductivity: 1.729577,
        density: 2242.585,
        specificHeat: 836.8,
        thermalAbsorptance: 0.9,
        solarAbsorptance: 0.65,
        visibleAbsorptance: 0.65,
        image: '',
      },
    ],
    airGap: [],
    windowGlazing: [],
    windowGas: [],
  },
  roomFocused: null,
  roomMoved: null,
};

export function appReducer(
  state: AppState | undefined = initialState,
  action: AppActiontypes,
): AppState {
  switch (action.type) {
    case ACTION_ROOM_ADD: {
      const { floors } = state;
      let currentFloor: Floor = {} as Floor;
      floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          floor.rooms.push(action.payload);
          currentFloor = floor;
        }
        return floor;
      });

      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        floors,
        currentFloor,
      };
    }
    case ACTION_ROOM_UPDATE: {
      let { floors } = state;
      let { currentFloor } = state;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          const newRooms = floor.rooms.map((room: Room) => {
            if (room.id === action.payload.id)
              return {
                ...room,
                ...action.payload,
              };
            return room;
          });
          currentFloor = { ...floor, rooms: newRooms };
          return { ...floor, rooms: newRooms };
        }
        return floor;
      });

      return {
        ...state,
        rooms: state.rooms.map((obj) => {
          if (obj.name === action.payload.name)
            return { ...obj, ...action.payload };
          return obj;
        }),
        floors,
        currentFloor,
      };
    }
    case ACTION_ROOM_WALLS_MATERIAL: {
      let { floors } = state;
      let { currentFloor } = state;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          const newRooms = floor.rooms.map((room: Room) => {
            if (room.id === action.payload.room)
              room.construction.wall = action.payload.wall;
            return room;
          });
          currentFloor = { ...floor, rooms: newRooms };
          return { ...floor, rooms: newRooms };
        }
        return floor;
      });

      return {
        ...state,
        floors,
        currentFloor,
      };
    }
    case ACTION_DOOR_ADD: {
      let { floors } = state;
      let { currentFloor } = state;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          currentFloor = { ...floor, doors: [...floor.doors, action.payload] };
          return { ...floor, doors: [...floor.doors, action.payload] };
        }
        return floor;
      });

      return {
        ...state,
        doors: [...state.doors, action.payload],
        floors,
        currentFloor,
      };
    }
    case ACTION_DOOR_UPDATE: {
      let { floors } = state;
      let doors: Door[] = [];
      let currentFloor: any;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          let newRooms;
          // UPDATE DOOR
          const newDoors = floor.doors.map((door: Door) => {
            if (door.id === action.payload.id) {
              // UPDATE ROOMS
              newRooms = floor.rooms.map((room: Room) => {
                if (room.id === action.payload.room) {
                  return { ...room, doors: floor.doors };
                }
                return room;
              });
              return { ...door, ...action.payload };
            }
            return door;
          });
          currentFloor = { ...floor, doors: newDoors, rooms: newRooms };
          doors = newDoors;
          return { ...floor, doors: newDoors };
        }
        return floor;
      });

      return {
        ...state,
        doors,
        floors,
        currentFloor,
      };
    }
    case ACTION_DOOR_ATTACH_TO_ROOM: {
      let { floors } = state;
      let { currentFloor } = state;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          // update door
          const newDoors = floor.doors.map((door: Door) => {
            if (door.id === action.payload.door.id) {
              return {
                ...door,
                room: action.payload.room,
              };
            }
            return door;
          });

          // update room
          const newRooms = floor.rooms.map((room: Room) => {
            if (room.id === action.payload.room) {
              // check door if exists
              const newDoor = room.doors.find(
                (door) => door.id === action.payload.door.id,
              );

              let newDoorList = [];
              if (!newDoor) {
                newDoorList = [...room.doors, action.payload.door];
              } else {
                newDoorList = [...room.doors];
              }

              return {
                ...room,
                doors: newDoorList,
              };
            }
            return room;
          });
          currentFloor = {
            ...floor,
            doors: newDoors,
            rooms: newRooms,
          };
          return currentFloor;
        }
        return floor;
      });

      return {
        ...state,
        floors,
        currentFloor,
      };
    }
    case ACTION_WINDOW_ADD: {
      let { floors, currentFloor } = state;
      floors = floors.map((floor) => {
        if (floor.id === action.payload.floor) {
          currentFloor = {
            ...floor,
            windows: [...floor.windows, action.payload],
          };
          return currentFloor;
        }
        return floor;
      });

      return {
        ...state,
        windows: [...state.windows, action.payload],
        floors,
        currentFloor,
      };
    }
    case ACTION_WINDOW_UPDATE: {
      let { floors, currentFloor, windows } = state;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          // UPDATE WINDOW
          windows = floor.windows.map((window: Window) => {
            if (window.id === action.payload.id) {
              return { ...window, ...action.payload };
            }
            return window;
          });

          // UPDATE ROOMS
          const newRooms = floor.rooms.map((room: Room) => {
            if (room.id === action.payload.room) {
              return {
                ...room,
                windows,
              };
            }
            return room;
          });

          currentFloor = { ...floor, rooms: newRooms, windows };
          return currentFloor;
        }
        return floor;
      });

      return {
        ...state,
        windows,
        floors,
        currentFloor,
      };
    }
    case ACTION_WINDOW_ATTACH_TO_ROOM: {
      let { floors, currentFloor, windows } = state;

      floors = floors.map((floor: Floor) => {
        if (floor.id === action.payload.floor) {
          // update window
          const newWindows = floor.windows.map((window: Window) => {
            if (window.id === action.payload.window.id) {
              return { ...window, room: action.payload.room };
            }
            return window;
          });
          // update room
          const newRooms = floor.rooms.map((room: Room) => {
            if (room.id === action.payload.room) {
              // check window if exists
              const newWindow = room.windows.find(
                (window) => window.id === action.payload.window.id,
              );

              let newWindowList = [];
              if (!newWindow) {
                newWindowList = [...room.windows, action.payload.window];
              } else {
                newWindowList = [...room.windows];
              }
              return { ...room, windows: newWindowList };
            }

            return {
              ...room,
              windows: room.windows.filter(
                (e) => e.id !== action.payload.window.id,
              ),
            };
          });
          windows = newWindows;
          currentFloor = { ...floor, rooms: newRooms, windows: newWindows };
          return currentFloor;
        }
        return floor;
      });

      return {
        ...state,
        floors,
        windows,
        currentFloor,
      };
    }
    case ACTION_FLOOR_ADD: {
      return {
        ...state,
        floors: [...state.floors, action.payload],
      };
    }
    case ACTION_FLOOR_UPDATE: {
      return {
        ...state,
        floors: state.floors.map((obj) => {
          if (obj.id === action.payload.id)
            return { ...obj, ...action.payload };
          return obj;
        }),
      };
    }
    case ACTION_CURRENTFLOOR_SWITCH: {
      return {
        ...state,
        currentFloor: action.payload,
      };
    }
    case ACTION_CONSTRUCTION_CREATE: {
      const { construction } = state;
      construction.push(action.payload);
      return {
        ...state,
        construction,
      };
    }
    case ACTION_MATERIAL_CREATE: {
      const { materials } = state;
      if (action.payload.category === 'mass') {
        materials.mass.push(action.payload as MaterialMass);
      } else if (action.payload.category === 'noMass') {
        materials.noMass.push(action.payload as MaterialNoMass);
      }
      return {
        ...state,
        materials,
      };
    }
    case ACTION_SHOW_3D: {
      return {
        ...state,
        show3D: !state.show3D,
      };
    }
    case ACTION_SHOW_COMPONENT_CONTROL: {
      return {
        ...state,
        roomFocused: state.rooms.find((room: Room) => room.id === action.payload.roomId) as Room
      };
    }
    case ACTION_SHOW_ROOM_MOVED: {
      console.log('id')
      console.log(action.payload.roomId)
      return {
        ...state,
        roomMoved: state.rooms.find((room: Room) => room.id === action.payload.roomId) as Room
      };
    }
    default:
      return state;
  }
}

export default appReducer;
