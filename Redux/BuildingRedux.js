import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  storeFloorRequest: ['data'],
  storeFloorSuccess: ['data'],
  storeFloorFailure: ['error'],

  destroyFloorRequest: ['data'],
  destroyFloorSuccess: ['data'],
  destroyFloorFailure: ['error'],

  storeRoomRequest: ['data'],
  storeRoomSuccess: ['data'],
  storeRoomFailure: ['error'],

  updateRoomRequest: ['data'],
  updateRoomSuccess: ['data'],
  updateRoomFailure: ['error'],

  destroyRoomRequest: ['data'],
  destroyRoomSuccess: ['data'],
  destroyRoomFailure: ['error'],
})

export const BuildingTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  floors: { data: [], fetching: false, error: null },
  rooms: { data: [], fetching: false, error: null }
})

export const BuildingSelectors = {
  getFloors: state => state.building.floors.data,
  getRooms: state => state.building.rooms.data,
}

export const storeFloorRequest = (state, { data }) =>
  state.merge({ ...state, floors: { ...state.floors, fetching: false, error: null } })
export const storeFloorSuccess = (state, { data }) =>
  state.merge({ ...state, floors: { ...state.floors, data, fetching: false, error: null } })
export const storeFloorFailure = (state, { error }) =>
  state.merge({ ...state, floors: { ...state.floors, fetching: false, error } })

export const destroyFloorRequest = (state, { data }) =>
  state.merge({ ...state, floors: { ...state.floors, fetching: false, error: null } })
export const destroyFloorSuccess = (state, { data }) =>
  state.merge({ ...state, floors: { ...state.floors, data, fetching: false, error: null } })
export const destroyFloorFailure = (state, { error }) =>
  state.merge({ ...state, floors: { ...state.floors, fetching: false, error } })

export const storeRoomRequest = (state, { data }) =>
  state.merge({ ...state, rooms: { ...state.rooms, fetching: false, error: null } })
export const storeRoomSuccess = (state, { data }) =>
  state.merge({ ...state, rooms: { ...state.rooms, data, fetching: false, error: null } })
export const storeRoomFailure = (state, { error }) =>
  state.merge({ ...state, rooms: { ...state.rooms, fetching: false, error } })

export const updateRoomRequest = (state, { data }) =>
  state.merge({ ...state, rooms: { ...state.rooms, fetching: false, error: null } })
export const updateRoomSuccess = (state, { data }) =>
  state.merge({ ...state, rooms: { ...state.rooms, data, fetching: false, error: null } })
export const updateRoomFailure = (state, { error }) =>
  state.merge({ ...state, rooms: { ...state.rooms, fetching: false, error } })

export const destroyRoomRequest = (state, { data }) =>
  state.merge({ ...state, rooms: { ...state.rooms, fetching: false, error: null }})
export const destroyRoomSuccess = (state, { data }) =>
  state.merge({ ...state, rooms: { ...state.rooms, data, fetching: false, error: null }})
export const destroyRoomFailure = (state, { error }) =>
  state.merge({ ...state, rooms: { ...state.rooms, fetching: false, error }})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_FLOOR_REQUEST]: storeFloorRequest,
  [Types.STORE_FLOOR_SUCCESS]: storeFloorSuccess,
  [Types.STORE_FLOOR_FAILURE]: storeFloorFailure,

  [Types.DESTROY_FLOOR_REQUEST]: destroyFloorRequest,
  [Types.DESTROY_FLOOR_SUCCESS]: destroyFloorSuccess,
  [Types.DESTROY_FLOOR_FAILURE]: destroyFloorFailure,

  [Types.STORE_ROOM_REQUEST]: storeRoomRequest,
  [Types.STORE_ROOM_SUCCESS]: storeRoomSuccess,
  [Types.STORE_ROOM_FAILURE]: storeRoomFailure,

  [Types.UPDATE_ROOM_REQUEST]: updateRoomRequest,
  [Types.UPDATE_ROOM_SUCCESS]: updateRoomSuccess,
  [Types.UPDATE_ROOM_FAILURE]: updateRoomFailure,

  [Types.DESTROY_ROOM_REQUEST]: destroyRoomRequest,
  [Types.DESTROY_ROOM_SUCCESS]: destroyRoomSuccess,
  [Types.DESTROY_ROOM_FAILURE]: destroyRoomFailure,
})
