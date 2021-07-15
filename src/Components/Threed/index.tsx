/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import React, { useState, useEffect } from 'react';

import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';

import THREE, {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Camera,
} from 'three';
import OrbitControlsView from 'expo-three-orbit-controls';
import { getColor } from '@styles/index';
import { Floor } from '@type/index';

interface Props {
  floors: Floor[];
}

class DoorMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        color: 0xff0000,
      }),
    );
  }
}
class WindowMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        color: 0xff0000,
      }),
    );
  }
}
class RoomMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        color: 0xff0000,
        // side: THREE.BackSide,
        roughness: 10,
        metalness: 10,
        wireframe: true,
        transparent: true,
      }),
    );
  }
}

const SCALE = 30;

export default function Threed(props: Props) {
  const [orbCamera, setOrbCamera] = useState<any>(null);
  let timeout: number;

  useEffect(
    () =>
      // Clear the animation loop when the component unmounts
      () => clearTimeout(timeout),
    [],
  );

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0xffffff;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera: PerspectiveCamera = new PerspectiveCamera(
      70,
      width / height,
      0.01,
      1000,
    );
    camera.position.set(SCALE / 2, SCALE / 2, SCALE / 2);
    setOrbCamera(camera);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(SCALE, SCALE));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    let prevHeight = 0;
    for (let indexFloor = 0; indexFloor < props.floors.length; indexFloor++) {
      // // LOAD ROOMS
      for (let i = 0; i < props.floors[indexFloor].rooms.length; i++) {
        // eslint-disable-next-line no-console
        console.log('onContextCreate');
        // eslint-disable-next-line no-console
        console.log(props.floors[indexFloor].rooms);
        const room = new RoomMesh();

        // room.material = new THREE.MeshBasicMaterial({
        //   color: getColor(props.floors[indexFloor].rooms[i].color),
        //   // transparent: true,
        //   // opacity: 0.8,
        // });
        room.scale.x = props.floors[indexFloor].rooms[i].width / SCALE;
        room.scale.y = props.floors[indexFloor].rooms[i].depth / (SCALE - 25);
        room.scale.z = props.floors[indexFloor].rooms[i].height / SCALE;
        room.position.set(
          (props.floors[indexFloor].rooms[i].x +
            props.floors[indexFloor].rooms[i].width / 2) /
            SCALE,
          props.floors[indexFloor].rooms[i].depth / (SCALE - 25) / 2 +
            prevHeight,
          (props.floors[indexFloor].rooms[i].y +
            props.floors[indexFloor].rooms[i].height / 2) /
            SCALE,
        );
        scene.add(room);
        // const geo: EdgesGeometry = new THREE.EdgesGeometry(room.geometry);
        // const mat: LineBasicMaterial = new THREE.LineBasicMaterial({
        //   color: 0x000000,
        //   linewidth: 1,
        // });
        // const wireframe: LineSegments = new THREE.LineSegments(geo, mat);
        // wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
        // room.add(wireframe);
        camera.lookAt(room.position);
      }

      // LOAD DOORS
      // for (let i = 0; i < props.floors[indexFloor].doors.length; i++) {
      //   const door = new DoorMesh();
      //   scene.add(door);
      //   door.material = new THREE.MeshPhysicalMaterial({
      //     color: getColor(props.floors[indexFloor].doors[i].color),
      //     transparent: true,
      //     opacity: 0.8,
      //   });
      //   door.scale.x = props.floors[indexFloor].doors[i].width / SCALE;
      //   door.scale.y = props.floors[indexFloor].doors[i].depth / (SCALE - 25);
      //   door.scale.z = props.floors[indexFloor].doors[i].height / SCALE;
      //   door.position.set(
      //     (props.floors[indexFloor].doors[i].x +
      //       1 +
      //       props.floors[indexFloor].doors[i].width / 2) /
      //       SCALE,
      //     props.floors[indexFloor].doors[i].depth / (SCALE - 25) / 2 +
      //       prevHeight,
      //     (props.floors[indexFloor].doors[i].y +
      //       1 +
      //       props.floors[indexFloor].doors[i].height / 2) /
      //       SCALE,
      //   );
      //   camera.lookAt(door.position);
      // }
      // LOAD WINDOWS
      for (let i = 0; i < props.floors[indexFloor].windows.length; i++) {
        const window = new WindowMesh();
        scene.add(window);
        // window.material = new THREE.MeshPhysicalMaterial({
        //   color: getColor(props.floors[indexFloor].windows[i].color),
        //   transparent: true,
        //   opacity: 0.8,
        // });
        window.scale.x = props.floors[indexFloor].windows[i].width / SCALE;
        window.scale.y =
          props.floors[indexFloor].windows[i].depth / (SCALE - 25);
        window.scale.z = props.floors[indexFloor].windows[i].height / SCALE;
        window.position.set(
          (props.floors[indexFloor].windows[i].x +
            1 +
            props.floors[indexFloor].windows[i].width / 2) /
            SCALE,
          props.floors[indexFloor].windows[i].depth / (SCALE - 25) / 2 +
            1 +
            +prevHeight,
          (props.floors[indexFloor].windows[i].y +
            1 +
            props.floors[indexFloor].windows[i].height / 2) /
            SCALE,
        );
        camera.lookAt(window.position);
      }
      prevHeight += props.floors[indexFloor].rooms[0].depth / (SCALE - 25);
    }

    camera.lookAt(0, 0, 0);

    const render = () => {
      timeout = requestAnimationFrame(render);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <OrbitControlsView style={{ flex: 1, zoomIndex: 100 }} camera={orbCamera}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
    </OrbitControlsView>
  );
}
