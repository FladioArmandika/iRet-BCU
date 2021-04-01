import * as React from "react";
import { View, TouchableWithoutFeedback, Text, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import OrbitControlsView from 'expo-three-orbit-controls';
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { TweenMax } from 'gsap';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    AmbientLight,
    SphereGeometry,
    Fog,
    GridHelper,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SpotLight,
    OrthographicCamera,
    PlaneGeometry,
    MeshBasicMaterial,
} from "three";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;


export default function Land(props) {


    const [landDimention, setLandDimention] = React.useState(props.LandDimension)
    //const [building, setBuilding] = React.useState([])
    const [isDraw, setIsDraw] = React.useState(false)

    const scene = new Scene();
    const camera = new PerspectiveCamera(80, width / height, 1, 1000000);
    const planegeo = new PlaneGeometry(landDimention, landDimention);
    const grid = new GridHelper(landDimention, landDimention);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const cube = new THREE.Mesh(geometry, material);

    let cameraInitialPositionX = 5;
    let cameraInitialPositionY = 5;
    let cameraInitialPositionZ = 1;

    const building = [
        {
            "floorColor": "#4053ae",
            "floorDepth": "100",
            "floorHeight": "100",
            "floorName": "Ikan todak",
            "floorWidth": "100",
            "x": 306,
            "y": 100,
        },
        {
            "floorColor": "#d73964",
            "floorDepth": "100",
            "floorHeight": "100",
            "floorName": "Ikan todak",
            "floorWidth": "100",
            "x": 206,
            "y": 200,
        },
    ]

    React.useEffect(() => {

        // _get3dvalue()
        _drawingCube()

    }, [])


    const _drawingCube = async () => {
        // let d = await AsyncStorage.getItem('3d')
        // let building = await JSON.parse(d)
        // console.log(d)
        for (let i = 0; i < building.length; i++) {
            console.log(i)
            console.log(building[i].floorHeight)
            // console.log(i.FloorDepth)
            // console.log(i.FloorColor)
            const geometry = new THREE.BoxGeometry(parseInt(building[i].floorWidth / 100), parseInt(building[i].floorHeight / 100), parseInt(building[i].floorDepth / 100));
            // geometry.translate(1, 1, 1)
            const material = new THREE.MeshBasicMaterial({ color: building[i].floorColor });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.set(parseInt(building[i].x) / 100, 0, -(parseInt(building[i].y) / 100))
        }
    }

    function move(distance) {
        TweenMax.to(camera.position, 0.2, {
            y: camera.position.y + distance,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <OrbitControlsView style={{ flex: 1, zIndex: 100 }} camera={camera} >
                <GLView
                    style={{ flex: 1 }}
                    onContextCreate={async (gl) => {
                        // GL Parameter disruption
                        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

                        // Renderer declaration and set properties
                        const renderer = new Renderer({ gl });
                        renderer.setSize(width, height);
                        renderer.setClearColor("#fff");

                        camera.position.set(
                            cameraInitialPositionX,
                            cameraInitialPositionY,
                            cameraInitialPositionZ
                        );

                        planegeo.rotateX(-Math.PI / 2);

                        const plane = new Mesh(planegeo, new MeshBasicMaterial({
                            color: "#ecf0f1"
                        }))
                        //scene.add(plane)



                        // Scene declaration, add a fog, and a grid helper to see axes dimensions
                        scene.fog = new Fog("#3A96C4", 1, 10000);

                        grid.position.set(0, .05, 0)
                        //scene.add(grid)

                        // Add all necessary lights
                        const ambientLight = new AmbientLight(0x101010);
                        scene.add(ambientLight);

                        // Render function
                        const render = () => {
                            requestAnimationFrame(render);
                            renderer.render(scene, camera);
                            gl.endFrameEXP();
                        };
                        render();
                    }}
                >
                </GLView>
            </OrbitControlsView>
            {/* <TouchableOpacity
                style={style.btn}
                onPress={() => move(-0.2)}
            >

                <Text style={style.btntext}>{isDraw ? "Finish" : "Draw"} {isDraw}</Text>
            </TouchableOpacity> */}

        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textinput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        marginTop: 10
    },
    btn: {
        width: '100%',
        padding: 15,
        marginTop: 10,
        backgroundColor: '#3498db',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btntext: {
        fontWeight: 'bold',
        color: 'white'
    }

})

