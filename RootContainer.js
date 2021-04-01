import * as React from 'react';
import { connect } from 'react-redux'
import BuildingActions from './Redux/BuildingRedux'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Linking,
  LogBox,
  Modal,
  View,
  Text,
} from 'react-native';
import NativeColorPicker from 'native-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuidGenerator } from './Libs/Helper'

// Components
import Floor from "./Components/Floor";
import DraggableBox  from './Components/Ractangle';
import { Button } from './Components/Components';
import Land from './Components/Land';

// Get Width & Height based on Device Screen
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// ignore Warning
LogBox.ignoreAllLogs();

// styles
import { apply } from "./styles/OsmiProvider";

const RootContainer = props => {
  const [colors] = React.useState([
    '#d73964',
    '#d23440',
    '#db643a',
    '#e88334',
    '#e2a71e',
    '#e25241',
    '#d0da59',
    '#4053ae',
    '#70b949',
    '#73564a',
  ]);

  const [floorList, setFloorList] = React.useState([
    // {
    //   id: 1,
    //   floorName: 'Floor1',
    //   floorWidth: 50,
    //   floorHeight: 50,
    //   floorDepth: 250,
    //   floorColor: "color1"
    // }
  ])
  const [floorSelected, setFloorSelected] = React.useState(null)
  const [roomList, setRoomList] = React.useState([])
  const [modalFloor, setModalFloor] = React.useState(false)
  const [modalRoom, setModalRoom] = React.useState(false)
  const [modal3DVisible, setModal3DVisible] = React.useState(false)

  const [floorName, setFloorName] = React.useState('')
  const [floorWidth, setFloorWidth] = React.useState('')
  const [floorHeight, setFloorHeight] = React.useState('')
  const [floorDepth, setFloorDepth] = React.useState('')
  const [floorColor, setFloorColor] = React.useState('#d73964')

  const [roomName, setRoomName] = React.useState('')
  const [roomWidth, setRoomWidth] = React.useState('')
  const [roomHeight, setRoomHeight] = React.useState('')
  const [roomDepth, setRoomDepth] = React.useState('')
  const [roomColor, setRoomColor] = React.useState('#d73964')
  const [x, setX] = React.useState('')
  const [y, setY] = React.useState('')

  const [isRenderThreeD, setIsRenderThreeD] = React.useState(false)
  const [landDimention, setLandDimention] = React.useState("20")
  const [isMainScreen, setMainScreen] = React.useState(true)
  const [camZ, setCamZ] = React.useState(15)

  const _addFloor = () => {
    const id = uuidGenerator()

    const newFloor = {
      id,
      floorName,
      floorWidth,
      floorHeight,
      floorDepth,
      floorColor: _transformFloorColor(floorColor),
    }
    setFloorSelected(id)
    props.storeFloor(newFloor)

    setModalFloor(false)
    _resetFloorForm()
  }

  const _addRoom = () => {
    const id = uuidGenerator()

    const newRoom = {
      floorId: floorSelected,
      id,
      roomName,
      roomWidth,
      roomHeight,
      roomDepth,
      roomColor: _transformFloorColor(floorColor),
      x: 0,
      y: 0,
    }

    props.storeRoom(newRoom)

    setModalRoom(false)
    _resetRoomForm()
  }

  console.log("Floors", props.floors)
  console.log("Rooms", props.rooms)

  const _modal3DTrigger = () => {
    setModal3DVisible(!modal3DVisible)
  }

  const _resetFloorForm = () => {
    setFloorName('')
    setFloorWidth('')
    setFloorHeight('')
    setFloorColor('#d73964')
    setFloorDepth('')
  }

  const _resetRoomForm = () => {
    setRoomName('')
    setRoomWidth('')
    setRoomHeight('')
    setRoomColor('#d73964')
    setRoomDepth('')
  }

  const _get3dvalue = async() => {
    let d = await AsyncStorage.getItem('3d')
    console.log(JSON.parse(d))
  }

  const _onFloorClick = React.useCallback(item => setFloorSelected(item?.id), [props.floors])
  const _onAddFloor = React.useCallback(() => setModalFloor(true), [])

  const _renderFloors = () => {
    return props.floors.data.map((item, index) => (
      <Floor
        data={item}
        isActive={item?.id === floorSelected}
        onClick={_onFloorClick}
        key={index}
      />
    ))
  }

  const _renderModalFloor = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalFloor}
      style={{
        width: width
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Floor Properties</Text>

          <TextInput
            placeholder="Floor name"
            value={floorName}
            onChangeText={value => setFloorName(value)}
            style={styles.textinput}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Floor width (m)"
            value={floorWidth}
            onChangeText={value => setFloorWidth(value)}
            style={styles.textinput}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Floor height (m)"
            value={floorHeight}
            onChangeText={value => setFloorHeight(value)}
            style={styles.textinput}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Floor depth (m)"
            value={floorDepth}
            onChangeText={value => setFloorDepth(value)}
            style={styles.textinput}
          />
          <NativeColorPicker
            animate
            colors={colors}
            selectedColor={floorColor}
            itemSize={30}
            markerType="checkmark"
            markerDisplay="adjust"
            onSelect={item => setFloorColor(item)}
            scrollEnabled={false}
            style={{
              marginTop: 20
            }}
          />

          <View style={apply('row items-center')}>
            <Button
              text="Cancel"
              type="Danger"
              onPress={() => setModalFloor(false)}
              btnStyle={apply('flex mr-1')}
            />
            <Button
              text="Create"
              type="Primary"
              onPress={_addFloor}
              btnStyle={apply('flex ml-1')}
            />
          </View>
        </View>
      </View>
    </Modal>
  )

  const _renderModalRoom = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalRoom}
      style={{
        width: width
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Room Properties</Text>

          <TextInput
            placeholder="Room name"
            value={roomName}
            onChangeText={value => setRoomName(value)}
            style={styles.textinput}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Room width (m)"
            value={roomWidth}
            onChangeText={value => setRoomWidth(value)}
            style={styles.textinput}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Room height (m)"
            value={roomHeight}
            onChangeText={value => setRoomHeight(value)}
            style={styles.textinput}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Room depth (m)"
            value={roomDepth}
            onChangeText={value => setRoomDepth(value)}
            style={styles.textinput}
          />
          <NativeColorPicker
            animate
            colors={colors}
            selectedColor={roomColor}
            itemSize={30}
            markerType="checkmark"
            markerDisplay="adjust"
            onSelect={item => setRoomColor(item)}
            scrollEnabled={false}
            style={{
              marginTop: 20
            }}
          />

          <View style={apply('row items-center')}>
            <Button
              text="Cancel"
              type="Danger"
              onPress={() => setModalRoom(false)}
              btnStyle={apply('flex mr-1')}
            />
            <Button
              text="Create"
              type="Primary"
              onPress={_addRoom}
              btnStyle={apply('flex ml-1')}
            />
          </View>
        </View>
      </View>
    </Modal>
  )

  const _renderShadowRoom = () => {
    const _currentIndex = props.floors.data.findIndex(obj => obj?.id === floorSelected)
    const _shadowData = props.rooms.data.filter(obj => obj?.floorId === props.floors?.data?.[_currentIndex - 1]?.id)

    return _shadowData.length !== 0 ? _shadowData.map((item, index) => (
      <DraggableBox
        key={index}
        boxStyle={{
          backgroundColor: apply(item.roomColor),
          width: parseInt(item.roomWidth) * 10,
          height: parseInt(item.roomHeight) * 10,
          opacity: 0.5
        }}
        data={item}
      />
    )) : null
  }

  const _renderRooms = () => {
    const rooms = props.rooms.data.filter(obj => obj?.floorId === floorSelected)

    console.log("rooms", rooms)

    return rooms.length !== 0 ? rooms.map((item, index) =>
      <DraggableBox
        key={index}
        boxStyle={{
          backgroundColor: apply(item.roomColor),
          width: parseInt(item.roomWidth) * 10,
          height: parseInt(item.roomHeight) * 10
        }}
        data={item}
      />
      // <View />
    ) : <Text>{props.floors.data.find(obj => obj?.id === floorSelected)?.floorName ?? '2D'} Area</Text>
  }

  const _transformFloorColor = React.useCallback(item => {
    switch (item) {
      case colors[0]:
        return "color1"
      case colors[1]:
        return "color2"
      case colors[2]:
        return "color3"
      case colors[3]:
        return "color4"
      case colors[4]:
        return "color5"
      case colors[5]:
        return "color6"
      case colors[7]:
        return "color8"
      case colors[8]:
        return "color9"
      case colors[9]:
        return "color10"

      default:
        return "color1"
    }
  }, [])

  return (
    <SafeAreaView style={styles.scrollView}>
      <Text style={styles.header}>
        IRet-BCU Demo
      </Text>

      {isRenderThreeD ?
        <SafeAreaView style={styles.scrollView}>
          <SafeAreaView
            style={{ flex: 8 }}
          >
            <Land
              LandDimension={parseInt(landDimention)}
              CamZ={camZ}
              Zone={floorList}
            />
          </SafeAreaView>
          <View
            style={styles.tools_area}
          >
            <Button
              text="View AR"
              type="Primary"
              onPress={() => {
                Linking.openURL('https://dinartech.com/ar/');
              }}
            />
            <Button
              text="Back"
              type="Danger"
              onPress={() => {
                setIsRenderThreeD(false)
              }}
            />
          </View>
        </SafeAreaView>
        :
        <SafeAreaView style={styles.scrollView}>
          <SafeAreaView style={styles.twod_area}>
            {_renderShadowRoom()}
            {_renderRooms()}
          </SafeAreaView>

          <View style={styles.tools_area}>
            <ScrollView
              horizontal
              showHorizontalIndicatorScroll={false}
              contentContainerStyle={apply('py-2')}
            >
              {_renderFloors()}
              <Floor
                data={{ floorName: "Add Floor" }}
                isActive={false}
                onClick={_onAddFloor}
              />
            </ScrollView>

            <View style={apply('row items-center')}>
              <Button
                text="Add Room"
                type="Primary"
                onPress={() => setModalRoom(true)}
                btnStyle={[
                  apply('flex mr-1'),
                  !floorSelected && apply('bg-gray-300')
                ]}
                disabled={!floorSelected}
              />
              <Button
                text="Build 3D"
                type="Primary"
                onPress={() => {
                  setIsRenderThreeD(true)
                }}
                btnStyle={[
                  apply('flex ml-1'),
                  !floorSelected && apply('bg-gray-300')
                ]}
                disabled={!floorSelected}
              />
            </View>
          </View>
        </SafeAreaView>
      }



      {/* 2D design Area */}



      {/* Modal Area */}

      {_renderModalFloor()}
      {_renderModalRoom()}

      <Modal
        animationType="none"
        transparent={true}
        visible={modal3DVisible}
        style={{
          width: width
        }}
      >
        {/* <SafeAreaView style={styles.centeredView}> */}
        <SafeAreaView style={styles.modalFlexView}>
          <Text style={styles.modalText}>Floor Properties</Text>

          <Land
            LandDimension={parseInt(landDimention)}
            CamZ={camZ}
            cube={floorList}
          />

          <Button
            text="Close"
            type="Danger"
            onPress={_modal3DTrigger}
          >
          </Button>

        </SafeAreaView>
        {/* </SafeAreaView> */}
      </Modal>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  floors: state.building.floors,
  rooms: state.building.rooms
})

const mapDispatchToProps = dispatch => ({
  storeFloor: payload => dispatch(BuildingActions.storeFloorRequest(payload)),
  storeRoom: payload => dispatch(BuildingActions.storeRoomRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    backgroundColor: '#1e90ff',
    paddingTop: 30,
    zIndex: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 20
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    borderRadius: 5
  },
  modalFlexView: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    borderRadius: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textinput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced6e0',
    borderRadius: 8,
    marginTop: 10
  },
  twod_area: {
    flex: 9,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tools_area: {
    backgroundColor: '#ffffff',
    padding: 10,
    zIndex: 100,
  }
});
