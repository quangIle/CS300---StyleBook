import { combineReducers } from "redux"
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_ACCOUNT_INFORMATION,
  SET_ITEM_DETAIL,
  SET_MODAL_LOADING_VISIBLE,
  DISPLAY_MODAL_MESSAGE,
  DISPLAY_MODAL_CONFIRM,
} from "./actions"

const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: //pay load is an item
      for (const item of state)
        if (item._id === action.payload._id) return state
      return [action.payload, ...state]

    case REMOVE_FROM_WISHLIST: //pay load is id
      return state.filter((item) => item._id !== action.payload)

    default:
      return state
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFORMATION:
      return action.payload
    default:
      return state
  }
}

const itemDetailReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ITEM_DETAIL:
      return action.payload
    default:
      return state
  }
}

const modalLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_MODAL_LOADING_VISIBLE:
      return action.payload
    default:
      return state
  }
}

const modalMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case DISPLAY_MODAL_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const modalConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case DISPLAY_MODAL_CONFIRM:
      return action.payload
    default:
      return state
  }
}

export const reducer = combineReducers({
  wishlist: wishlistReducer,
  user: userReducer,
  itemDetail: itemDetailReducer,
  modalLoading: modalLoadingReducer,
  modalMessage: modalMessageReducer,
  modalConfirm: modalConfirmReducer,
})
