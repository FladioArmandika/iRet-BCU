import { call, put, select } from 'redux-saga/effects'
import BuildingActions, {BuildingSelectors, updateRoomSuccess} from '../Redux/BuildingRedux'

export function * storeFloors(action) {
  const { data } = action

  const getFloors = yield select(BuildingSelectors.getFloors)
  yield put(BuildingActions.storeFloorSuccess([...getFloors, data]))
}

export function * destroyFloors(action) {
  const { data } = action

  const listFloor = yield select(BuildingSelectors.getFloors)
  yield put(BuildingActions.destroyFloorSuccess(listFloor.filter(obj => obj?.id !== data)))
}

export function * storeRooms(action) {
  const { data } = action

  const getRooms = yield select(BuildingSelectors.getRooms)
  yield put(BuildingActions.storeRoomSuccess([...getRooms, data]))
}

export function * destroyRooms(_, action) {
  const { data } = action

  const listFloor = yield select(BuildingSelectors.getRooms)
  yield put(BuildingActions.destroyRoomSuccess(listFloor.filter(obj => obj?.id !== data)))
}

export function * updateRooms(action) {
  const { data } = action

  yield put(BuildingActions.updateRoomSuccess(data))
}
