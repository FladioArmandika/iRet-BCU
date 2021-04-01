import { takeLatest, all } from 'redux-saga/effects'

import { BuildingTypes } from '../Redux/BuildingRedux'

import {
  storeFloors,
  destroyFloors,
  storeRooms,
  destroyRooms,
  updateRooms,
} from './BuildingSaga'

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(BuildingTypes.STORE_FLOOR_REQUEST, storeFloors),
    takeLatest(BuildingTypes.DESTROY_FLOOR_REQUEST, destroyFloors),
    takeLatest(BuildingTypes.STORE_ROOM_REQUEST, storeRooms),
    takeLatest(BuildingTypes.DESTROY_ROOM_REQUEST, destroyRooms),
    takeLatest(BuildingTypes.UPDATE_ROOM_REQUEST, updateRooms),
  ])
}
