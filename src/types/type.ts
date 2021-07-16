export interface Window {
  id: string;
  color: string;
  isOverlap: boolean;
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  floor: string;
  room: string;
  construction: string;
  wall: number;
}

export interface Door {
  id: string;
  color: string;
  isOverlap: boolean;
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  floor: string;
  room: string;
}

export interface RoomConstruction {
  wall: string[];
  floor: string;
  roof: string;
}

export interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  depth: number;
  color: string;
  floor: string;
  doors: Door[];
  x: number;
  y: number;
  windows: Window[];
  construction: RoomConstruction;
}

export interface Floor {
  id: string;
  level: number;
  rooms: Room[];
  doors: Door[];
  windows: Window[];
}

export interface Construction {
  name: string;
  category: string;
  material: string[];
  image: string;
}
