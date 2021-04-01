import React, { Component } from 'react';
import { connect } from 'react-redux'
import BuildingActions from "../Redux/BuildingRedux";
import { Animated, StyleSheet, View, Text } from 'react-native';
import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import { USE_NATIVE_DRIVER } from './../config';

export class DraggableBox extends Component {
  constructor(props) {
    super(props);

    const findCurrent = props.rooms.data.find(obj => obj?.id === props.data.id)

    this.state = {
      allComponent: props.rooms.data.find(obj => obj?.id === props.data.id)
    }
    this._translateY = new Animated.Value(findCurrent?.y);
    this._translateX = new Animated.Value(findCurrent?.x);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }

  componentDidMount() {
    this.setState({ allComponent: this.props.rooms.data.find(obj => obj?.id === this.props.data.id) })
  }

  _onHandlerStateChange = async (event, name) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);

      // this.state.allComponent[name].x = event.nativeEvent.absoluteX
      // this.state.allComponent[name].y = event.nativeEvent.absoluteY
      // this.setState({
      //     allComponent: this.state.allComponent
      // })
      // // await AsyncStorage.setItem('3d', JSON.stringify(datas))
      // console.log(this.state.allComponent)
      console.log(this.props.rooms)
      const newData = this.props.rooms.data.map(item => {
        return item?.id === this.props.data.id ? {
          ...item,
          x: event.nativeEvent.absoluteX,
          y: event.nativeEvent.absoluteY
        } : item
      })

      const newObject = {
        ...this.state.allComponent,
        x: event.nativeEvent.absoluteX,
        y: event.nativeEvent.absoluteY
      }

      this.setState({ allComponent: newObject });
      this.props.updateRoom(newData)
    }
  };
  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={(event) => this._onHandlerStateChange(event, this.props.fname)}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: this._translateX },
                { translateY: this._translateY },
              ],
            },
            this.props.boxStyle,
          ]}
        >
          <Text style={styles.text}>{this.props.data.roomName}</Text>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

class Example extends Component {
  render() {
    return (
      <View style={styles.scrollView}>
        <DraggableBox
          onLayout={event => {
            const layout = event.nativeEvent.layout
            console.log('x:', layout.x)
            console.log('y:', layout.y)
            console.log(this.props.fname)
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  floors: state.building.floors,
  rooms: state.building.rooms
})

const mapDispatchToProps = dispatch => ({
  updateRoom: payload => dispatch(BuildingActions.updateRoomRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DraggableBox)

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 200,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});
