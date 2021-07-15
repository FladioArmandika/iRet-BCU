import { Construction, Window } from './type';

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface ZoneCorner {
  corner1: Coordinate;
  corner2: Coordinate;
  corner3: Coordinate;
  corner4: Coordinate;
}

export interface Corner {
  cornerBottomLeft: Coordinate;
  cornerTopLeft: Coordinate;
  cornerBottomRight: Coordinate;
  cornerTopRight: Coordinate;
}

export interface WallCorner extends Corner {}
export interface RoofCorner extends Corner {}
export interface FloorCorner extends Corner {}

export interface ZoneWall {
  wall1: WallCorner;
  wall2: WallCorner;
  wall3: WallCorner;
  wall4: WallCorner;
}

export interface ZoneSurface {
  floor: FloorCorner;
  roof: RoofCorner;
}

export interface ZoneConstruction {
  wall: Construction[];
  roof: Construction;
  floor: Construction;
  windows: Construction[];
}

export interface ZoneWindow extends Window, Corner {}

export interface Zone {
  name: string;
  windows: ZoneWindow[];
  floorArea: number;
  corners: ZoneCorner;
  walls: ZoneWall;
  surfaces: ZoneSurface;
  construction: ZoneConstruction;
}
