// action types
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST"
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST"
export const SET_ITEM_DETAIL = "SET_ITEM_DETAIL"
export const SET_MODAL_LOADING_VISIBLE = "SET_MODAL_LOADING_VISIBLE"
export const DISPLAY_MODAL_MESSAGE = "DISPLAY_MODAL_MESSAGE"
export const SET_ACCOUNT_INFORMATION = "SET_ACCOUNT_INFORMATION"
export const DISPLAY_MODAL_CONFIRM = "DISPLAY_MODAL_CONFIRM"
//actions
export const setAccountInformation = (item) => ({
  type: SET_ACCOUNT_INFORMATION,
  payload: item,
})
//wishlist
export const addToWishlist = (item) => ({
  type: ADD_TO_WISHLIST,
  payload: item,
})
export const removeFromWishlist = (id) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: id,
})

//itemDetail
export const setItemDetail = (itemDetail) => ({
  type: SET_ITEM_DETAIL,
  payload: itemDetail,
})

//loading
export const setModalLoadingVisible = (visible) => ({
  type: SET_MODAL_LOADING_VISIBLE,
  payload: visible,
})

//message
export const displayModalMessage = (message, callback = null) => ({
  type: DISPLAY_MODAL_MESSAGE,
  payload: { message, callback },
})

//confirm
export const displayModalConfirm = (message, callback = null) => ({
  type: DISPLAY_MODAL_CONFIRM,
  payload: { message, callback },
})
